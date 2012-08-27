function diffUsingJS(e,t,n,r){var i=difflib.stringAsLines(e),s=difflib.stringAsLines(t),o=new difflib.SequenceMatcher(i,s),u=o.get_opcodes(),a=get("row"+rowID+"Content","parent");while(a.firstChild)a.removeChild(a.firstChild);var f="";f=f?f:null,a.appendChild(diffview.buildView({baseTextLines:i,newTextLines:s,opcodes:u,baseTextName:n,newTextName:r,contextSize:f,viewType:1}))}top.selRowArray=[],top.selRepoDirArray=[],top.selActionArray=[],doRepo=function(e){document.showRepo.repo.value=e,document.showRepo.submit()},updateSelection=function(e,t,n,r){e.checked?(top.selRowArray.push(t),top.selRepoDirArray.push(n),top.selActionArray.push(r)):(arrayIndex=top.selRowArray.indexOf(t),top.selRowArray.splice(arrayIndex,1),top.selRepoDirArray.splice(arrayIndex,1),top.selActionArray.splice(arrayIndex,1))},getContent=function(e,t){if("undefined"==typeof overOption||!overOption){if("undefined"==typeof lastRow||lastRow!=e||get("row"+e+"Content").innerHTML==""){for(i=1;i<=rowID;i++)get("row"+i+"Content").innerHTML="",get("row"+i+"Content").style.display="none";repo=top.repo+"/"+t,dir=top.path+"/"+t,document.fcForm.rowID.value=e,document.fcForm.repo.value=repo,document.fcForm.dir.value=dir,document.fcForm.action.value="view",document.fcForm.submit()}else get("row"+e+"Content").innerHTML="",get("row"+e+"Content").style.display="none";lastRow=e}},commitChanges=function(){if(top.selRowArray.length>0)if(document.fcForm.title.value!="Title..."&&document.fcForm.message.value!="Message..."){get("blackMask","top").style.display="block",top.selRowValue="",top.selDirValue="",top.selRepoValue="",top.selActionValue="";for(i=0;i<top.selRowArray.length;i++)top.selRowValue+=top.selRowArray[i],top.selActionArray[i]=="changed"&&(top.selDirValue+=top.selRepoDirArray[i].split("@")[0],top.selRepoValue+=top.selRepoDirArray[i].split("@")[1]),top.selActionArray[i]=="new"&&(top.selDirValue+=top.selRepoDirArray[i],top.selRepoValue+=""),top.selActionArray[i]=="deleted"&&(top.selDirValue+="",top.selRepoValue+=top.selRepoDirArray[i]),top.selActionValue+=top.selActionArray[i],i<top.selRowArray.length-1&&(top.selRowValue+=",",top.selDirValue+=",",top.selRepoValue+=",",top.selActionValue+=",");document.fcForm.rowID.value=top.selRowValue,document.fcForm.dir.value=top.selDirValue,document.fcForm.repo.value=top.selRepoValue,document.fcForm.action.value=top.selActionValue,document.fcForm.submit()}else alert("Please enter a title & message for the commit");else alert("Please select some files/folders to commit");return!1},pullContent=function(e,t,n,r){get("blackMask","top").style.display="block";if(e=="selected"){top.selRowValue="",top.selDirValue="",top.selRepoValue="",top.selActionValue="";for(i=0;i<top.selRowArray.length;i++)top.selRowValue+=top.selRowArray[i],top.selActionArray[i]=="changed"&&(repoUser=top.selRepoDirArray[i].split("@")[1].split("/")[0],repoName=top.selRepoDirArray[i].split("@")[1].split("/")[1],top.selDirValue+=top.selRepoDirArray[i].split("@")[0],top.selRepoValue+=top.selRepoDirArray[i].split("@")[1].replace(repoUser+"/"+repoName+"/","")),top.selActionArray[i]=="new"&&(top.selDirValue+=top.selRepoDirArray[i],top.selRepoValue+=""),top.selActionArray[i]=="deleted"&&(repoUser=top.selRepoDirArray[i].split("/")[0],repoName=top.selRepoDirArray[i].split("/")[1],top.selDirValue+="",top.selRepoValue+=top.selRepoDirArray[i].replace(repoUser+"/"+repoName+"/","")),top.selActionValue+=top.selActionArray[i],i<top.selRowArray.length-1&&(top.selRowValue+=",",top.selDirValue+=",",top.selRepoValue+=",",top.selActionValue+=",")}else top.selRowValue=e,top.selDirValue=t,top.selRepoValue=n,top.selActionValue=r;top.fcFormAlias.rowID.value=top.selRowValue,top.fcFormAlias.dir.value=top.selDirValue,top.fcFormAlias.repo.value=top.selRepoValue,top.fcFormAlias.action.value="PULL:"+top.selActionValue,top.fcFormAlias.submit()},getData=function(){actionArray[0]!="new"?repo.read("master",repoArray[0],function(e,t){document.fcForm["repoContents"+rowIDArray[0]].innerHTML=t,e?alert("Sorry, there was an error reading "+repoArray[0]):(removeFirstArrayItems(),rowIDArray.length>0?getData():document.fcForm.submit())}):(removeFirstArrayItems(),rowIDArray.length>0?getData():document.fcForm.submit())},sendData=function(e,t){repo.read("master",filePath,function(n,r){dirContent=document.fcForm.fileContents.value,repoContent=r,diffUsingJS(dirContent,repoContent,e,t),get("row"+rowID+"Content","parent").style.display="inline-block"})},removeFirstArrayItems=function(){rowIDArray.splice(0,1),repoArray.splice(0,1),dirArray.splice(0,1),actionArray.splice(0,1)},hideRow=function(e){top.rowCount--,updateInfo("parent"),get("checkbox"+e,"parent").checked=!1,parent.updateSelection(get("checkbox"+e,"parent")),get("row"+e,"parent").style.display=get("row"+e+"Content","parent").style.display="none"},ffAddOrUpdate=function(e,t,n){repo.write("master",t,document.fcForm["fileContents"+e].value,parent.document.fcForm.title.value+"\n\n"+parent.document.fcForm.message.value,function(n){n?alert("Sorry, there was an error adding "+t):(removeFirstArrayItems(),hideRow(e),top.newCount--,rowIDArray.length>0?startProcess():get("blackMask","top").style.display="none")})},ffDelete=function(e,t,n){repo.remove("master",t,function(n){n?alert("Sorry, there was an error deleting "+t):(removeFirstArrayItems(),hideRow(e),top.deletedCount--,rowIDArray.length>0?startProcess():get("blackMask","top").style.display="none")})},startProcess=function(){if(actionArray[0]=="changed"||actionArray[0]=="new")actionArray[0]=="changed"&&(repoLoc=repoArray[0].replace(repoUser+"/"+repoName+"/","")),actionArray[0]=="new"&&(repoLoc=dirArray[0].replace(top.path,"")),ffAddOrUpdate(rowIDArray[0],repoLoc,actionArray[0]);actionArray[0]=="deleted"&&(repoLoc=repoArray[0].replace(repoUser+"/"+repoName+"/",""),ffDelete(rowIDArray[0],repoLoc,actionArray[0]))},get=function(e,t){return t?window[t].document.getElementById(e):document.getElementById(e)},updateInfo=function(e){get("infoPane",e).innerHTML="<b style='font-size: 18px'>INFO:</b><br><br><b>"+top.rowCount+" files</b><br><br>"+top.changedCount+" changed<br>"+top.newCount+" new<br>"+top.deletedCount+" deleted"},gitCommand=function(e,t){if(e=="repo.show"){userRepo=t.split("@")[0].split("/"),dir=t.split("@")[1];var n=github.getRepo(userRepo[0],userRepo[1]);rowID=0,n.getTree("master?recursive=true",function(e,t){for(i=0;i<t.length;i++)repoListArray.push(t[i].path),repoSHAArray.push(t[i].sha);var n="",r="",s="";top.rowCount=0,top.changedCount=0,top.newCount=0,top.deletedCount=0;for(i=0;i<dirListArray.length;i++)repoArrayPos=repoListArray.indexOf(dirListArray[i]),ext=dirTypeArray[i]=="dir"?"folder":dirListArray[i].substr(dirListArray[i].lastIndexOf(".")+1),repoArrayPos=="-1"?(rowID++,sE=ext=="folder"?' style="cursor: default"':"",cE=ext!="folder"?' onClick="getContent('+rowID+",'"+dirListArray[i]+"')\"":"",gE='onClick="pullContent('+rowID+",'"+top.path+"/"+dirListArray[i]+"','"+dirListArray[i]+"','new')\"",r+="<div class='row' id='row"+rowID+"'"+cE+sE+">",r+="<input type='checkbox' class='checkbox' id='checkbox"+rowID+"' onMouseOver='overOption=true' onMouseOut='overOption=false' onClick='updateSelection(this,"+rowID+',"'+top.path+"/"+dirListArray[i]+'","new")\'>',r+="<div class='icon ext-"+ext+"'></div>"+dirListArray[i],r+="<div class='pullGithub' style='left: 815px' onMouseOver='overOption=true' onMouseOut='overOption=false' "+gE+">Delete from server</div><br>",r+="</div>",r+="<span class='rowContent' id='row"+rowID+"Content'></span>",top.rowCount++,top.newCount++):dirTypeArray[i]=="file"&&dirSHAArray[i]!=repoSHAArray[repoArrayPos]&&(rowID++,sE=ext=="folder"?' style="cursor: default"':"",cE=ext!="folder"?' onClick="getContent('+rowID+",'"+dirListArray[i]+"')\"":"",gE='onClick="pullContent('+rowID+",'"+top.path+"/"+dirListArray[i]+"','"+dirListArray[i]+"','changed')\"",n+="<div class='row' id='row"+rowID+"'"+cE+sE+">",n+="<input type='checkbox' class='checkbox' id='checkbox"+rowID+"' onMouseOver='overOption=true' onMouseOut='overOption=false' onClick='updateSelection(this,"+rowID+',"'+top.path+"/"+dirListArray[i]+"@"+top.repo+"/"+dirListArray[i]+'","changed")\'>',n+="<div class='icon ext-"+ext+"'></div>"+dirListArray[i],n+="<div class='pullGithub' onMouseOver='overOption=true' onMouseOut='overOption=false' "+gE+">Pull from Github</div><br>",n+="</div>",n+="<span class='rowContent' id='row"+rowID+"Content'></span>",top.rowCount++,top.changedCount++);for(i=0;i<repoListArray.length;i++)dirArrayPos=dirListArray.indexOf(repoListArray[i]),ext=repoListArray[i].lastIndexOf("/")>repoListArray[i].lastIndexOf(".")?"folder":repoListArray[i].substr(repoListArray[i].lastIndexOf(".")+1),dirArrayPos=="-1"&&(rowID++,sE=ext=="folder"?' style="cursor: default"':"",cE=ext!="folder"?' onClick="getContent('+rowID+",'"+repoListArray[i]+"')\"":"",gE='onClick="pullContent('+rowID+",'"+top.path+"/"+repoListArray[i]+"','"+repoListArray[i]+"','deleted')\"",s+="<div class='row' id='row"+rowID+"'"+cE+sE+">",s+="<input type='checkbox' class='checkbox' id='checkbox"+rowID+"' onMouseOver='overOption=true' onMouseOut='overOption=false' onClick='updateSelection(this,"+rowID+',"'+top.repo+"/"+repoListArray[i]+'","deleted")\'>',s+="<div class='icon ext-"+ext+"'></div>"+repoListArray[i],s+="<div class='pullGithub' onMouseOver='overOption=true' onMouseOut='overOption=false' "+gE+">Pull from Github</div><br>",s+="</div>",s+="<span class='rowContent' id='row"+rowID+"Content'></span>",top.rowCount++,top.deletedCount++);n="<b style='font-size: 18px'>CHANGED FILES:</b><br><br>"+n,r="<b style='font-size: 18px'>NEW FILES:</b><br><br>"+r,s="<b style='font-size: 18px'>DELETED FILES:</b><br><br>"+s,get("compareList").innerHTML=n+"<br><br>"+r+"<br><br>"+s,updateInfo(),get("blackMask","top").style.display="none"})}}