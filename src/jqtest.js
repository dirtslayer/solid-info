import jq from 'node-jq';

const filter = ".[][].chapters.[].file";
const jsonPath = '/home/dd/git/solid-info/public/books.json'
const options = {}

jq.run(filter, jsonPath, options)
  .then((output) => {
    console.log(output)
  })
  .catch((err) => {
    console.error(err)
    // Something went wrong...
  })
