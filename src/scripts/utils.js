

export function generateLightColorHex() {
    let color = "#";
    for (let i = 0; i < 3; i++)
        color += (
        "0" +
        Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)
        ).slice(-2);
    return color;
}

// Compute the edit distance between the two given strings
export function getEditDistance(a, b) {
    if (a.length === 0) return b.length; 
    if (b.length === 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
        if (b.charAt(i-1) == a.charAt(j-1)) {
            matrix[i][j] = matrix[i-1][j-1];
        } else {
            matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                    Math.min(matrix[i][j-1] + 1, // insertion
                                            matrix[i-1][j] + 1)); // deletion
        }
        }
    }

    return matrix[b.length][a.length];
}

export function getDateFromTimestamp(timestamp) {
    const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];

    const date = new Date(timestamp.seconds * 1000);
    const secondes = addZeroIfLessThenTen(date.getSeconds());
    const minutes = addZeroIfLessThenTen(date.getMinutes());
    const heures = addZeroIfLessThenTen(date.getHours());
    const jours= date.getDate();
    const mois= date.getMonth();
    const annee= date.getFullYear();
    const dateFormat = `${jours} ${months[mois]} ${annee}, ${heures}h${minutes}:${secondes}`
    return dateFormat;
}

function addZeroIfLessThenTen(number) {
    let finalNumber = number;
    if(number<2) {
        finalNumber = "0".concat(number);
    }
    return finalNumber;
}

function compare( a, b ) {
    if ( a.timestamp < b.timestamp ){
      return 1;
    }
    if ( a.timestamp > b.timestamp ){
      return -1;
    }
    return 0;
}
  
export function getDatasFromDocument(listDocuments) {
    let datas = []
    if(listDocuments.length>0){
        for(let i=0; i < listDocuments.length; i++) {
            let data = listDocuments[i].data()
            data["id"] = listDocuments[i].id
            datas.push(data)
        }
    }
    return datas;
}

export function sortByTime(dataDocuments) {

    let sortedList = []
    if(dataDocuments.length>0){
        for(let i=0; i < dataDocuments.length; i++) {
                sortedList.push(dataDocuments[i])
        }
        sortedList.sort(compare);
    }
    return sortedList;
}

function compareInvert( a, b ) {
    if ( a.timestamp > b.timestamp ){
      return 1;
    }
    if ( a.timestamp < b.timestamp ){
      return -1;
    }
    return 0;
}

export function sortByTimeInvert(dataDocuments) {

    let sortedList = []
    if(dataDocuments.length>0){
        for(let i=0; i < dataDocuments.length; i++) {
                sortedList.push(dataDocuments[i])
        }
        sortedList.sort(compareInvert);
    }
    return sortedList;
}

/* Prend une liste de document, trie par date et retourne dans une liste */
export function getDatasFromDocumentSortedByTime(listDocuments) {
    const data = getDatasFromDocument(listDocuments);
    const sortedData = sortByTime(data);
    return sortedData;
}