To reproduce the bug,

    git clone https://github.com/liorst/meteor-issue-1750.git

Reme the autopublish package:

    meteor remove autopublish

View the app, click the "Add Book" button a few times and watch what happens.
Reload the page to update the countsObj.

