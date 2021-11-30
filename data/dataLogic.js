const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
let content = [];

const saveData = () => {
    const data = JSON.stringify(content);
    fs.writeFile(path.join(__dirname,'./data.json'), data, (err) => {
        if (err) throw new Error('Error al grabar', err);
    })
}

function loadData() {
    try {
        content = require('./data.json');
    } catch (err) {
        content = []
    }
}

function createData(data) {
    loadData();
    content.push({
        uid: uuidv4(),
        ...data
    });
    saveData();
}

function getData() {
    loadData();
    return content;
}

function deleteContent({ id }) {
    loadData();
    const idx = content.findIndex(({ uid }) => (uid == id));
    content.splice(idx, 1);
    saveData();
}

function getContentId({ id }) {
    loadData();
    const element = content.find(({ uid }) => (uid == id));
    return element;
}

function updatedData({ id }, data) {
    loadData();
    const idx = content.findIndex(({ uid }) => (uid == id));
    content[idx] = { ...content[idx], ...data };
    saveData();
}

module.exports = {
    createData,
    updatedData,
    getContentId,
    deleteContent,
    getData
}


