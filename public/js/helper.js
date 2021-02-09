class Helper {
    parseTime = (x) => {
        var d = new Date(x);
        var n = d.getDate();
        var m = d.getMonth() + 1;
        var y = d.getFullYear();
        var hour = d.getHours();
        var minute = d.getMinutes();
        if (minute < 10) {
            minute = "0" + minute;
        }
        var publishedOn = n + "/" + m + "/" + y + " " + hour + ":" + minute + " (IST)";
        return publishedOn;
    }
    reduceString(string, threshold) {
        let theString = string.trim().split(' ');
        let newString = [];
        if (theString.length >= threshold) {
            for (let i = 0; i < threshold; i++) {
                newString.push(theString[i]);
            }
            return (newString.join(' ') + '...');
        } else {
            return theString.join(' ');
        }
    }
}
export default Helper