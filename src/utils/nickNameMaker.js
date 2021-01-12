import {word_note, sequelize} from "../db/models";

const nickNameMaker = async () => {
    const randomWords = await word_note.findAll({
        order: sequelize.random(),
        limit: 2,
    });

    const firstWord = randomWords[0].word;
    const secondWord = randomWords[1].word;
    const isExist = checkEnding(firstWord);
    const middleText = ['의', isExist ? '과' : '와'];

    return `${firstWord + middleText[Math.floor(Math.random() * middleText.length)]} ${secondWord}`;
};

const checkEnding = (word) => {
    if (typeof word !== 'string')
        return null;

    const lastLetter = word[word.length - 1];
    const uni = lastLetter.charCodeAt(0);

    if (uni < 44032 || uni > 55203)
        return null;

    return (uni - 44032) % 28 !== 0;
};

export default nickNameMaker;
