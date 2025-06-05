## This is my second episode
  In this, I talk about how we ignite our own React app by using bundlers and make it production-ready for my own created React app.
 
  In this, we create our React app using npm. Mainly, I said we use Parcel (like Vite, Parcel is used) instead of creating React manually (using Create React App) or using CDN links like importing scripts and all.

 ## Questions that arise (important concepts):
 - npm = manages node packages
 - What is package.json and package-lock.json?
 - Why should you not push node_modules into GitHub? Because you can regenerate it when you have package.json through npm install.
 - npx is for executing the package, but npm is for installing and managing the package.

 ## Theory Assignment:
- What is `NPM`?
- What is `Parcel/Webpack`? Why do we need it?
- What is `.parcel-cache`?
- What is `npx`?
- What is the difference between `dependencies` vs `devDependencies`?
- What is `Tree Shaking`?
- What is `Hot Module Replacement`?
- List down your `favorite 5 superpowers of Parcel` and describe any 3 of them in your own words.
- What is `.gitignore`? What should we add and not add into it?
- What is the difference between `package.json` and `package-lock.json`?
- Why should I not modify `package-lock.json`?
- What is `node_modules`? Is it a good idea to push that on git?
- What is the `dist` folder?
- What is `browserslist`?
- Read about different bundlers: `vite`, `webpack`, `parcel`
- Read about: `^` - caret and `~` - tilde
- Read about `script` types in HTML (MDN Docs)

## Parcel Benefits
-

## Small concepts
(About browser bundles)
- In package.json, there is a thing I add called browserslist, which basically tells about what all supported versions you want to see your React app loading on.