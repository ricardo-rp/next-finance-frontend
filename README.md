# Project name

## Relevant docs:
- [NextJs](https://nextjs.org/docs)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
- [CSS modules](https://github.com/css-modules/css-modules)
- [Tailwind CSS](https://tailwindcss.com/docs/)
- [PostCSS](https://postcss.org/)
- [React Query](https://react-query.tanstack.com/overview)

## Linting and formatting
Make sure to have the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) extensions installed in your code editor. Disable any other linting and formatting extensions in this project. Prettier will be run using the [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) plugin. Make sure you lint on save, and you don't format on save (See `settings.json` inside the `.vscode` directory).

By default, Next.js will only lint files in the `pages/`, `components/`, and `lib/` directories. Do not create javascript or typescript files outside these directories. This configuration can be altered with a [custom next.config](https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files), but it is adviced to maintain the defaults.

## Typescript and react practices

### Data fetching and context

React-query introduces a key-based cache that can be accessed from anywhere in the app.
Often times, you need to access the same query data in multiple components. A common pattern is to query the data in the parent component and pass it as props to the children.

```tsx
export function ParentComponent() {
  const { data } = useUserData()

  return <>
      <Child1 data={data} />
      <Child2 data={data} />
  </>
}
```
This works fine when you only have a couple of immediate child components, but the pattern breaks down when you have many sibling components, or you need to pass the data down more than one level.

The classic solution is to create a context containing the data, but it's easy to implement context poorly and end up with performance issues, or hurt component reusability.

Prefer using the query hook in every component that needs it. You can avoid redundant API calls with a smart fetch policy.
```tsx
// ParentComponent.tsx

export function ParentComponent() {
  return <>
    <Child1 />
    <Child2 />
  </>
}

// Child1.tsx
export function Child1() {
  const {data} = useUserData()

  return <>
      {data.user.name}
  </>
}

// Child2.tsx
export function Child2() {
  const {data} = userData()

  return <strong>
      {data.user.balance}
  </strong>
}
```

### Loader component pattern

When you have many queries in a single page, it's easy to end up with bloated JSX:

```tsx
export function BloatedComponent() {
  const {data: userData, isLoading: userIsLoading, error: userIsError} = useUserData()

  const {data: walletData, isLoading: walletIsLoading, error: walletIsError} = useWalletData()

  const {data: gameData, isLoading: gameIsLoading, error: gameIsError} = useGameData()

  return (
    <>
        <h1>{userIsLoading ? userData?.user.name : <Spinner />}</h1>

        <strong>{walletData?.wallet.balance}</strong>

        {gameIsError && <span>Something went wrong with the game </span>}
        {gameData && (
          <div>
            <span>Here is the game data:</span>
            <span> {gameData}</span>
          </div>
        )}
    </>
  )
}
```

Prefer using **Loader Components** whenever you fetch async data. This makes components much easier to read.
Components are nothing more than functions. As a general rule, every function should only do one, easy-to-understand, thing.
So avoid having a single component fetch multiple queries, or fetch a query and render some unrelated UI.

```tsx
export function NiceComponent() {
  return (
    <>
      <UserDataLoader />
      <WalletDataLoader />
      <GameDataLoader />
    </>
  )
}

// GameDataLoader.tsx
export function GameDataLoader() {
  const {data, isLoading, error} = useGameData()

  // We use early returns instead of `&&` or `?` to avoid bloating the main JSX
  if (isLoading) return <div>loading...</div>;
  if (isError) return <span>Something went wrong with the game </span>;
  if (!data) return <div>No data was found</div>; // We check data for falsy values to avoid blindly using `data?.property`

  return (
    <div>
      <span>Here is the game data:</span>
      <span>{gameData}</span>
    </div>
  )
}
```

### Locally defined props
Referencing globally defined types in your components will hurt re-usability and force you to browse multiple files to understand the component.

Given this component:
```ts
export function UserAvatar({ name, profilePicUrl }: UserAvatarProps) {
  return (
    <>
      <h1>{name}</h1>
      <img src={profilePicUrl} alt="You!"/>
    </>
  )
}
```

Avoid referencing the globally-defined `user` type when props are simple:
```tsx
//...UserAvatar.tsx
import User from "types";
type UserAvatarProps = { user: Pick<User, "profilePicUrl" | "name"> }; // We need to navigate into the `types` file to check what the props are.
```

And **never** use the whole global type if the component does not need it:
```tsx
//...UserAvatar.tsx
import User from "types";
type UserAvatarProps = { user: User }; // We aren't using some of these properties.
```

Prefer defining props locally:
```tsx
type UserAvatarProps = { name: string, profilePicUrl: string };
export function UserAvatar({ name, profilePicUrl }: UserAvatarProps) {
  return (
    <>
      <h1>{name}</h1>
      <img src={profilePicUrl} alt="You!"/>
    </>
  )
}
```

### Avoid default exports
Default exports lead to easy accidental renames. Default exports should only be used in NextJs Pages or where absolutely required by the framework.
```tsx
//...components/Card.tsx
function Card(){
  return <span> This is a card </span>
}
export default Card

//...pages/game.tsx
import Button from "components/card"
function GamePage() {
  return <Button />  // Why does this render a card? >:O
}
```

Prefer named exports:
```tsx
//...components/Card.tsx
export function Card(){
  return <span> This is a card </span>
}

//...pages/game.tsx
import { Card } from "components/card" // Much harder to accidentally rename.

function GamePage() {
  return <Card />
}
```

## Styling components

Prefer using your framework of choice's utility classes and make single-file components.

When the component gets too large or styles seem to be polluting the markup, break the component up into multiple components. In case this is not enough, you may create a .css module for that specific style.

DO:
```
gameView
│
└───PlayerInfo
│   │   index.tsx // Only imports styles from module in the same folder
│   │   customHook.ts
│   │   style.module.css
│
└───CardInfo
    │   index.tsx // Only imports styles from module in the same folder
    │   style.module.css
```
DONT:
```
gameView
│   style.module.css
└───PlayerInfo
│   │   index.tsx  // Imports style module from parent folder
│
└───CardInfo
    │   index.tsx  // Imports style module from parent folder
```

Create one .css module per component. Avoid importing a single style module in various react components. In case you have a group of related style modules, you can use [composing](https://github.com/css-modules/css-modules#composing-from-other-files) to re-use styles.

### Tailwind CSS

This project uses tailwindCSS as its preferred styling solution.

If you're using VSCode, make sure have the [PostCSS Language Support plugin](https://marketplace.visualstudio.com/items?itemName=csstools.postcss), to avoid warnings like [these](https://stackoverflow.com/questions/47607602/how-to-add-a-tailwind-css-rule-to-css-checker).

It's also recommended to install the [Tailwind IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension for a much better development experience.

### SASS

Sass is to be considered legacy and should eventually be removed from the project (and this template). TailwindCSS and PostCSS plugins can bring most of the functionallity needed from sass.

Do not use .scss in new style files, as many tailwind features will not be available.

## NextJs caveats

### Next/image
The next/image component is a very powerful optimization tool, but it is also an opinionanted safeguard against layout shift. (Read: [article](https://web.dev/image-component/)). Be sure to thoroughly read the component [docs](https://nextjs.org/docs/api-reference/next/image) before using.

When attempting to use unknown size images, use layout="fill" and **make sure the parent element has `position: relative`**.

### Server-side optimization

NextJs will automatically render a static document for every page in your application. During this initial render, the `window` object will be undefined. Be sure to check wether you are in the server-side or the client-side when trying to access browser properties.

### Persistent layouts

Pages in this application may optionally have a `layout` property. This layout property is a function that receives a page and returns JSX.
This might seem strange, as a react component that receives children is more intuitive.

This is intentional. Creating the layout with JSX syntax (Eg: <Layout>) would result in the layout being re-rendered on every page navigation. Calling the layout as a plain old function prevents this, as it skips the use of [React.createElement](https://reactjs.org/docs/react-without-jsx.html) and maintains the component tree.

More info on why this works [here](https://nextjs.org/docs/basic-features/layouts#per-page-layouts) and [here](https://reactjs.org/docs/reconciliation.html).

The layout system allows for complex nested layouts if needed.
