function generateHexId(n) {
    // Generate a random number up to 16^n - 1 (max n digit hex)
    const maxHexValue = Math.pow(16, n) - 1;
    const randomNum = Math.floor(Math.random() * maxHexValue);

    // Convert the number to hexadecimal and pad with leading zeros if necessary
    const hexId = randomNum.toString(16);
    
    return hexId;
}

module.exports = generateHexId;