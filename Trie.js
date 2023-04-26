class Trie {
    constructor() {
        this.root = new Node("")
    }

    //task1
    add(word) {
        const letterTable = splitWordIntoLetters(word.toLowerCase())
        let currentNode = this.root

        for (let letter of letterTable) {

            //check if currentNode has got given letter in children collection
            if (currentNode.children[letter] === undefined) {
                currentNode.children[letter] = new Node(letter)
            }
            currentNode = currentNode.children[letter]
        }
        //specify the end of word for the last character
        currentNode.endOfAWord = true

    }

    //task2
    returnMatchingWords(userInput) {
        const words = []
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
        //we may expect at max 2-dimension table, so we flat it
        const matchingWords = (words.flat(2)).map(word => userInput + word)
        //we check if userInput equals word in trie
        if (currentNode.endOfAWord) matchingWords.push(userInput)
        return matchingWords

    }
}


