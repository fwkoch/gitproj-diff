if (window.location.hostname == 'github.com') {

    // shortcut for library aliases used in gitproj
    var aliases = {
    }

    // Get org - all repos must be under this org
    var org = window.location.pathname.split('/')[1];

    // Get minus commits
    var minuses = document.getElementsByClassName('blob-code-deletion');
    var mcommits = {}
    for (var i = 0; i < minuses.length; i++) {
        var element = minuses[i];
        var text = element.innerText;
        var match = text.match(/-\s(.+)\s.+\s([a-z0-9]{40})/);
        if (match) {
            var lib = match[1];
            if (lib in aliases) {
                lib = aliases[lib];
            }
            var commit = match[2];
            mcommits[lib] = commit;
        }
    }

    // Get plus commits
    var pluses = document.getElementsByClassName('blob-code-addition');
    var pcommits = {}
    for (var i = 0; i < pluses.length; i++) {
        var element = pluses[i];
        var text = element.innerText;
        var match = text.match(/\+\s(.+)\s.+\s([a-z0-9]{40})/);
        if (match) {
            var lib = match[1];
            if (lib in aliases) {
                lib = aliases[lib];
            }
            var commit = match[2];
            pcommits[lib] = commit;
        }
    }

    // Get links to compare pages
    var commitLinks = {};
    for (var lib in mcommits) {
        var link = 'https://github.com/' + org + '/' + lib + '/compare/' + mcommits[lib] + '...' + pcommits[lib];
        commitLinks[mcommits[lib]] = link;
        commitLinks[pcommits[lib]] = link;
    }

    // Find these commits in the page again
    var commitKeys = [];
    for (var key in commitLinks) {
        if (commitLinks.hasOwnProperty(key)) {
            commitKeys.push(key);
        }
    }
    if (commitKeys.length > 0) {
        var updateElems = [];
        var updateNodes = [];
        var updateRefs = [];
        var commitreg = new RegExp(commitKeys.join('|'));
        var elements = document.getElementsByTagName('*');

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j];
                if (node.nodeType === 3) {
                    if (node.nodeValue.match(commitreg)) {
                        var ref = document.createElement("a");
                        ref.href = commitLinks[node.nodeValue.match(commitreg)[0]];
                        ref.title = "See diff...";
                        updateElems.push(element);
                        updateNodes.push(node);
                        updateRefs.push(ref);
                    }
                }
            }
        }
        // Replace commits with compare links
        for (var i = 0; i < updateElems.length; i++) {
            var element = updateElems[i];
            var node = updateNodes[i];
            var ref = updateRefs[i];
            element.removeChild(node);
            ref.appendChild(document.createTextNode(node.nodeValue));
            element.appendChild(ref);
        }
    }
}
