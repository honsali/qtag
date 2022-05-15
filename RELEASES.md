
last updated 2022-05-15 

## QTAG backlog 
- [M] ui-xp: show/hide saved work
- [M] ui-xp: list of tags to filter instead of select
- [M] ui-xp: highlight 
- [S] sharing: load another qtag.json file
- [M] bugfixing
- [S] truncate with ... long tag text

## new in 0.5.1
- 0.5.1-01 : view >> added english translation
- 0.5.1-02 : data >> switch from embedded quran text to standard data source of Tanzil (dep. for 0.5.1-01)  

## new in 0.2 
- show status header: number of active tags, last saved to storage, number of total tags
- ui-xp: when tag is selected, change select to span
- use custom tags
-- create a new tag, enter name & ename
-- append new tag to qtag select
-- append new tag to main select
- storing: use a single qtag.json file as opposed to one file per tag
-- loading a single file of tags: qtag.json
-- filterBy updated to search within a single file 
- bugfixing
-- download doesn't re-export the qtag object's tagList
		
##  new in 0.1  
-  new column to view/edit selection
-  new menu to save & download tagged selection
-  localStorage options to save selection 
-  increase font-size when hovering
-  clear rows on selecting no surah