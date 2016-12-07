NotARobot();

function NotARobot()
{
    //need to check for api logout and reauth if need once api is added for image tagging etc!
    doTheStuff();
}

function doTheStuff() {

    clickCheckBox();
    //find iframe in the page
}

function clickCheckBox() {
    var cBiFrame = findCheckboxIframe(document.body);
    checkbox = new Array();
    var checkbox = findCheckBox(cBiFrame.body, checkbox);
    checkbox[0].click();
}

function findCheckboxIframe(parent)
{
    var children = parent.children;

    for (var i = 0; i < children.length; i++) {

        var iFrameFound = findCheckboxIframe(children[i]);
        if(iFrameFound)
        {
            return iFrameFound;
        }

        if(children[i].nodeName.includes('IFRAME') && children[i].title.includes('recaptcha widget'))
        {
            return children[i].contentWindow.document;
        }
    }
}

function findCheckBox(parent, arr)
{
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
        arr.concat(findCheckBox(children[i], arr));
        if(children[i].className.includes('recaptcha-checkbox'))
        {
            arr.push(children[i])
        }

    }
    return arr;
}

