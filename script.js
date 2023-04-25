console.log("f")

const dictionary = ['car', 'carpet', 'java', 'javascript', 'internet']

const dictionaryWords = document.querySelector("#dictionaryWords")


//task1
const expandDictionary = (userInput) => {
    dictionary.push(userInput)
}

//task2
const autoCompleteQuery = (userInput) => {

}

function splitWordIntoLetters(word) {
    array = []
    for (let i = 0; i < word.length; i++) {
        array.push(word.charAt(i));
    }
    return array;
}

class Node {
    constructor(letter, parent) {
        this.letter = letter
        this.endOfAWord = false
        this.children = {}
        this.parent = parent
    }
}

class Trie {
    constructor() {
        this.root = new Node(null, null)
    }

    add(word) {
        const letterTable = splitWordIntoLetters(word)
        let currentNode = this.root

        for (let letter of letterTable) {

            //check if currentNode has got given letter in children collection
            if (currentNode.children[letter] === undefined) {
                currentNode.children[letter] = new Node(letter, this)
            }
            currentNode = currentNode.children[letter]
        }
        //specify the end of word for the last character
        currentNode.endOfAWord = true

    }

    returnMatchingWords(userInput) {
        let words = []
        const letterTable = splitWordIntoLetters(userInput)
        let currentNode = this.root

        //if we exit the loop, we're sure userInput exists in a trie
        for (let letter of letterTable) {

            if (currentNode.children[letter] !== undefined) {
                currentNode = currentNode.children[letter]
            }
            else return []
        }

        if (isEmpty(currentNode.children)) {
            return [userInput]
        }
        //traverse through children nodes
        else {
            //iterate through sub-trie keys
            for (let node in currentNode.children) {
                //pass into function sub-trie values
                words.push(traverse(currentNode.children[node]))
            }
        }
        return words

    }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function traverse(node) {
    const words = []
    if (isEmpty(node.children)) {
        return node.letter
    }
    //check if one word is contained in another words
    if (node.endOfAWord) {
        words.push(node.letter)
    }
    for (let currentNode in node.children) {
        //pass into function sub-trie values
        words.push(node.letter + traverse(node.children[currentNode]))
    }
    return words

}

