function splitWordIntoLetters(word) {
    array = []
    for (let i = 0; i < word.length; i++) {
        array.push(word.charAt(i));
    }
    return array;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

let helperTable = undefined

function traverse(node) {
    //debugger
    const words = []
    if (isEmpty(node.children)) {
        return node.letter
    }
    // check if one word is contained in another words
    if (node.endOfAWord) {
        words.push(node.letter)
    }
    for (let currentNode in node.children) {
        //pass into function sub-trie values

        // words.push(node.letter + traverse(node.children[currentNode]))

        //we may get string -> that's why we force it in the table, we may recive nested table -> thats why we flat it
        //so as a result we almost get one dimension array
        helperTable = [...(traverse(node.children[currentNode]))].flat()
        //we add current letter at the beginning of each suffix in the table
        const nextElem = helperTable.map(elem => node.letter + elem)
        words.push(nextElem)
    }
    return words

}

//html logic

function refreshDictionary(words) {
    dictionaryWords.innerHTML = ""
    for (word of words) {
        dictionaryWords.innerHTML += `<li>${word}</li>`
    }
}

const taskDictionary = ['car', 'carpet', 'java', 'javascript', 'internet']
let trieWords = []

const trie = new Trie()
for (item of taskDictionary) {
    trie.add(item.toLowerCase())
}

const dictionaryWords = document.querySelector("#dictionaryWords")
const addInput = document.querySelector("#addInput")
const addWordForm = document.querySelector("#addWord").addEventListener('submit', (e) => {
    e.preventDefault()
    trie.add(addInput.value)
    addInput.value = ""
    //to get all trie words we're just traversing trough whole tree
    trieWords = traverse(trie.root).flat(2)
    refreshDictionary(trieWords)
})



trieWords = traverse(trie.root).flat(2)
refreshDictionary(trieWords)

const task2 = document.querySelector("#task2")
const userInput = document.querySelector("#task2Input")
let trieResults = ""
userInput.addEventListener("keyup", () => {
    task2.innerHTML = ""
    trieResults = trie.returnMatchingWords(userInput.value)
    for (word of trieResults) {
        task2.innerHTML += `<option value="${word}">`
    }
})





