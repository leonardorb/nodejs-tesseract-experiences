# Experiences with node.js + Tesseract

Labs time with Tesseract and node.

## Using:

- [node.js](https://nodejs.org/)
- [node-tesseract](https://github.com/desmondmorris/node-tesseract)

## How to experiment:

### Install [Tesseract-OCR](https://code.google.com/p/tesseract-ocr/)

`brew install tesseract --all-languages`

### Install all needed node modules

`npm install`

### Start working with your documents/receipts:

You can delete everything under `/data_extracted/` and `/documents/`. They're there just to exemplify the experience.

Add your new documents/receipts at `/documents/` and run:

`node extract.js`

You should be able to see your extracted data under `/data_extracted/`.

![](http://d.pr/i/tJne+)