import doT from 'dot';

export default function (source) {
    doT.templateSettings.selfcontained = true;
    return 'export default ' + doT.template(source);
};
