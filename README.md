# Guiderjs

A customizable and animated library for creating guide on your website.

## Features

- 📦 Modern bundle
- 👌 Easy to use
- 🏳‍🌈 Support major frameworks (React,Vue)
- ⚡ Lightweight
- 🚧 Typescript support

## Get started

- [Vanilla](packages/vanilla/README.md)
- [React](packages/react/README.md)
- [Vue3](packages/vue3/README.md)

## Development

Run the flowing commands to develop locally. (use `pnpm v7` to manage packages and workspace.)

```shell
$ pnpm i

# Build core module
$ pnpm build

# Start dev service on localhost:5173/react/index.html localhost:5173/vanilla/index.html etc.
$ pnpm dev
```

If you need hot module load of core module, import from "@core/index" instead of "@guiderjs/core", and you can skip pnpm build
