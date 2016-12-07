var tagDepth;
var tagRelevanceValues;
var checkboxes;
var imageDimensionX;
var imageDimensionY;
var isSigns = false;
var signImage;

NotARobot();

function NotARobot()
{
    //need to check for api logout and reauth if need once api is added for image tagging etc!
    doTheStuff();
}

function doTheStuff() {

    //Google hides the iframe with the challenge until after checkbox is clicked, so lets click it!!!
    clickCheckBox();

    var check = function(){
        var iFrame = findIframe(document.body);
        if(typeof iFrame !== 'undefined'){
            var imageSrc = findJoinedImageSource(iFrame.body);
            var category = findCategoryKeyword(iFrame.body);

            checkboxes = new Array();
            checkboxes = findCheckBoxes(iFrame.body, checkboxes);

            tagRelevanceValues = new Array();
            for(var i = 0; i < imageDimensionX*imageDimensionY; i++)
            {
                tagRelevanceValues[i] = new Array(tagDepth);
                for(var j = 0; j < tagDepth; j++)
                {
                    tagRelevanceValues[i][j] = -1;
                }
            }

            var theImage = new Image();
        }
        else {
            setTimeout(check, 1000); // check again in a second
        }
    }

    check();
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

function findCheckBoxes(parent, arr)
{
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
        arr.concat(findCheckBoxes(children[i], arr));
        if(children[i].className.includes('rc-imageselect-checkbox'))
        {
            arr.push(children[i])
        }

    }
    return arr;
}

function findIframe(parent)
{
    var children = parent.children;

    for (var i = 0; i < children.length; i++) {

        var iFrameFound = findIframe(children[i]);
        if(iFrameFound)
        {
            return iFrameFound;
        }

        if(children[i].nodeName.includes('IFRAME') && children[i].title.includes('recaptcha challenge'))
        {
            return children[i].contentWindow.document;
        }
    }
}

function findJoinedImageSource(parent)
{
    var children = parent.children;

    for (var i = 0; i < children.length; i++) {

        var imageSrcFound = findJoinedImageSource(children[i]);
        if(imageSrcFound)
        {
            return imageSrcFound;
        }

        if(children[i].className.includes('rc-image-tile-42'))
        {
            imageDimensionX = 2;
            imageDimensionY = 4;
            tagDepth = 1;
            return children[i].src;
        }
        if(children[i].className.includes('rc-image-tile-33'))
        {
            imageDimensionX = 3;
            imageDimensionY = 3;
            tagDepth = 5;
            return children[i].src;
        }
        if(children[i].className.includes('rc-image-tile-44'))
        {
            imageDimensionX = 4;
            imageDimensionY = 4;
            tagDepth = 1;
            return children[i].src;
        }
    }
}

function findCategoryKeyword(parent)
{
    var children = parent.children;

    for (var i = 0; i < children.length; i++) {

        var categoryKeywordFound = findCategoryKeyword(children[i]);
        if(categoryKeywordFound)
        {
            return categoryKeywordFound;
        }

        if(children[i].className.includes('rc-imageselect-desc'))
        {
            if(!children[i].className.includes('canonical')) {
                var isSigns = true;
                var signImage = parent.getElementsByTagName('img')[0].src;
            }
            return children[i].innerHTML.match('<strong>(.*)<\/strong>')[1];
        }
    }
}
