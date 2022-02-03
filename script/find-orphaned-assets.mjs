#!/usr/bin/env node

// [start-readme]
//
// Print a list of all the asset files that can't be found mentioned
// in any of the source files (content & code).
//
// [end-readme]

import fs from 'fs'
import path from 'path'
import program from 'commander'
import walk from 'walk-sync'

const EXCEPTIONS = new Set([
  // These files are dynamically referenced in Search.tsx
  // so they're referred to as `... search-${iconSize}.svg`
  'assets/images/octicons/search-16.svg',
  'assets/images/octicons/search-24.svg',
])

program
  .description('Print all images that are in ./assets/ but not found in any source files')
  .option('-e, --exit', 'Exit script by count of orphans (useful for CI)')
  .option('-v, --verbose', 'Verbose outputs')
  .option('--json', 'Output in JSON format')
  .option('--exclude-translations', "Don't search in translations/")
  .parse(process.argv)

main(program.opts(), program.args)

async function main(opts) {
  const { json, verbose, exit, excludeTranslations } = opts

  const walkOptions = {
    directories: false,
    includeBasePath: true,
  }
  const sourceFiles = []
  const roots = [
    'content',
    'data',
    'tests',
    'components',
    'script',
    'stylesheets',
    'contributing',
    'pages',
  ]
  if (!excludeTranslations) {
    roots.push('translations')
  }

  for (const root of roots) {
    sourceFiles.push(
      ...walk(
        root,
        Object.assign(
          {
            globs: ['!**/*.+(png|csv|graphql|json|svg)'],
          },
          walkOptions
        )
      )
    )
  }
  // Add exceptions
  sourceFiles.push('CONTRIBUTING.md')
  sourceFiles.push('README.md')
  verbose && console.log(`${sourceFiles.length.toLocaleString()} source files found in total.`)

  const allImages = new Set(
    walk(
      'assets',
      Object.assign(
        {
          globs: ['!**/*.+(md)'],
        },
        walkOptions
      )
    ).filter((filePath) => !filePath.endsWith('.md'))
  )

  verbose && console.log(`${allImages.size.toLocaleString()} images found in total.`)

  for (const sourceFile of sourceFiles) {
    const content = fs.readFileSync(sourceFile, 'utf-8')
    for (const imagePath of allImages) {
      const needle = imagePath.split(path.sep).slice(-2).join('/')
      if (content.includes(needle) || EXCEPTIONS.has(imagePath)) {
        allImages.delete(imagePath)
      }
    }
  }

  if (verbose && allImages.size) {
    console.log('The following files are not mentioned anywhere in any source file')
  }
  if (json) {
    console.log(JSON.stringify([...allImages], undefined, 2))
  } else {
    for (const imagePath of [...allImages].sort((a, b) => a.localeCompare(b))) {
      console.log(imagePath)
    }
  }

  if (verbose) {
    console.log(`${allImages.size.toLocaleString()} orphans left.`)
    const totalDiskSize = getTotalDiskSize(allImages)
    console.log(`Total disk size of all of these: ${(totalDiskSize / 1024 / 1024).toFixed(1)}MB`)
  }

  if (exit) {
    process.exit(allImages.size)
  }
}

function getTotalDiskSize(filePaths) {
  let sum = 0
  for (const filePath of filePaths) {
    sum += fs.statSync(filePath).size
  }
  return sum
}
