exports.isSectionNameValid = (section) =>{
    let sectionRegex = /^[a-z]+(-[a-z]+)*$/;
    return sectionRegex.test(section);
};
