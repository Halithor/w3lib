# Warcraft III Typescript Standard Library

> A Typescript API for Warcraft III map plus a standard library.

The Typescript API component has the goal of allowing a map maker to do everything they could in
Warcraft III without using the types from the WC3 system. All WC3 types will be wrapped in classes
to enable an OOP style of programming. Global functions will be replaced more Typescript aligned
methods, allowing the developer to avoid the older WC3 global function style. As a note, Promises
are not supported by the Lua transpiler, as much as I would like to use them.

The Standard Library will provide many features that map makes can use in their map creation.
Systems for knockback, timer recycling, easier spell implementation, etc will be created to simplify
everyone's development process.

This entire package will also try to avoid some of the more leak-prone data types from Warcraft III,
like `location`s and `group`s. These types will be replaced with `Vec2` and `Unit[]`, which will be
garbage collected. Furthermore, no more un-typed numerical values will be allowed, especially ID
types.

## Standard Library Feature List

TODO

# Contributing

Currently not accepting contributions. Open an Issue or send me a DM on the Hiveworkshop and we can
chat about contributing.

## Original Credit

This repo is a fork of cipherxof's [w3ts](https://github.com/cipherxof/w3ts) library, with some
additional goals and features.
