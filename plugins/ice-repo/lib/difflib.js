/***
This is part of jsdifflib v1.0. <http://snowtide.com/jsdifflib>

Copyright (c) 2007, Snowtide Informatics Systems, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

	* Redistributions of source code must retain the above copyright notice, this
		list of conditions and the following disclaimer.
	* Redistributions in binary form must reproduce the above copyright notice,
		this list of conditions and the following disclaimer in the documentation
		and/or other materials provided with the distribution.
	* Neither the name of the Snowtide Informatics Systems nor the names of its
		contributors may be used to endorse or promote products derived from this
		software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
DAMAGE.
***/
/* Author: Chas Emerick <cemerick@snowtide.com> */
__whitespace={" ":!0,"	":!0,"\n":!0,"\f":!0,"\r":!0},difflib={defaultJunkFunction:function(e){return __whitespace.hasOwnProperty(e)},stripLinebreaks:function(e){return e.replace(/^[\n\r]*|[\n\r]*$/g,"")},stringAsLines:function(e){var t=e.indexOf("\n"),n=e.indexOf("\r"),r=t>-1&&n>-1||n<0?"\n":"\r",i=e.split(r);for(var s=0;s<i.length;s++)i[s]=difflib.stripLinebreaks(i[s]);return i},__reduce:function(e,t,n){if(n!=null)var r=n,i=0;else{if(!t)return null;var r=t[0],i=1}for(;i<t.length;i++)r=e(r,t[i]);return r},__ntuplecomp:function(e,t){var n=Math.max(e.length,t.length);for(var r=0;r<n;r++){if(e[r]<t[r])return-1;if(e[r]>t[r])return 1}return e.length==t.length?0:e.length<t.length?-1:1},__calculate_ratio:function(e,t){return t?2*e/t:1},__isindict:function(e){return function(t){return e.hasOwnProperty(t)}},__dictget:function(e,t,n){return e.hasOwnProperty(t)?e[t]:n},SequenceMatcher:function(e,t,n){this.set_seqs=function(e,t){this.set_seq1(e),this.set_seq2(t)},this.set_seq1=function(e){if(e==this.a)return;this.a=e,this.matching_blocks=this.opcodes=null},this.set_seq2=function(e){if(e==this.b)return;this.b=e,this.matching_blocks=this.opcodes=this.fullbcount=null,this.__chain_b()},this.__chain_b=function(){var e=this.b,t=e.length,n=this.b2j={},r={};for(var i=0;i<e.length;i++){var s=e[i];if(n.hasOwnProperty(s)){var o=n[s];t>=200&&o.length*100>t?(r[s]=1,delete n[s]):o.push(i)}else n[s]=[i]}for(var s in r)r.hasOwnProperty(s)&&delete n[s];var u=this.isjunk,a={};if(u){for(var s in r)r.hasOwnProperty(s)&&u(s)&&(a[s]=1,delete r[s]);for(var s in n)n.hasOwnProperty(s)&&u(s)&&(a[s]=1,delete n[s])}this.isbjunk=difflib.__isindict(a),this.isbpopular=difflib.__isindict(r)},this.find_longest_match=function(e,t,n,r){var i=this.a,s=this.b,o=this.b2j,u=this.isbjunk,a=e,f=n,l=0,c=null,h={},p=[];for(var d=e;d<t;d++){var v={},m=difflib.__dictget(o,i[d],p);for(var g in m)if(m.hasOwnProperty(g)){c=m[g];if(c<n)continue;if(c>=r)break;v[c]=k=difflib.__dictget(h,c-1,0)+1,k>l&&(a=d-k+1,f=c-k+1,l=k)}h=v}while(a>e&&f>n&&!u(s[f-1])&&i[a-1]==s[f-1])a--,f--,l++;while(a+l<t&&f+l<r&&!u(s[f+l])&&i[a+l]==s[f+l])l++;while(a>e&&f>n&&u(s[f-1])&&i[a-1]==s[f-1])a--,f--,l++;while(a+l<t&&f+l<r&&u(s[f+l])&&i[a+l]==s[f+l])l++;return[a,f,l]},this.get_matching_blocks=function(){if(this.matching_blocks!=null)return this.matching_blocks;var e=this.a.length,t=this.b.length,n=[[0,e,0,t]],r=[],i,s,o,u,a,f,l,c,h;while(n.length)a=n.pop(),i=a[0],s=a[1],o=a[2],u=a[3],h=this.find_longest_match(i,s,o,u),f=h[0],l=h[1],c=h[2],c&&(r.push(h),i<f&&o<l&&n.push([i,f,o,l]),f+c<s&&l+c<u&&n.push([f+c,s,l+c,u]));r.sort(difflib.__ntuplecomp);var p=j1=k1=block=0,d=[];for(var v in r)r.hasOwnProperty(v)&&(block=r[v],i2=block[0],j2=block[1],k2=block[2],p+k1==i2&&j1+k1==j2?k1+=k2:(k1&&d.push([p,j1,k1]),p=i2,j1=j2,k1=k2));return k1&&d.push([p,j1,k1]),d.push([e,t,0]),this.matching_blocks=d,this.matching_blocks},this.get_opcodes=function(){if(this.opcodes!=null)return this.opcodes;var e=0,t=0,n=[];this.opcodes=n;var r,i,s,o,u,a=this.get_matching_blocks();for(var f in a)a.hasOwnProperty(f)&&(r=a[f],i=r[0],s=r[1],o=r[2],u="",e<i&&t<s?u="replace":e<i?u="delete":t<s&&(u="insert"),u&&n.push([u,e,i,t,s]),e=i+o,t=s+o,o&&n.push(["equal",i,e,s,t]));return n},this.get_grouped_opcodes=function(e){e||(e=3);var t=this.get_opcodes();t||(t=[["equal",0,1,0,1]]);var n,r,i,s,o,u;t[0][0]=="equal"&&(n=t[0],r=n[0],i=n[1],s=n[2],o=n[3],u=n[4],t[0]=[r,Math.max(i,s-e),s,Math.max(o,u-e),u]),t[t.length-1][0]=="equal"&&(n=t[t.length-1],r=n[0],i=n[1],s=n[2],o=n[3],u=n[4],t[t.length-1]=[r,i,Math.min(s,i+e),o,Math.min(u,o+e)]);var a=e+e,f=[];for(var l in t)t.hasOwnProperty(l)&&(n=t[l],r=n[0],i=n[1],s=n[2],o=n[3],u=n[4],r=="equal"&&s-i>a&&(f.push([r,i,Math.min(s,i+e),o,Math.min(u,o+e)]),i=Math.max(i,s-e),o=Math.max(o,u-e)),f.push([r,i,s,o,u]));return f&&f[f.length-1][0]=="equal"&&f.pop(),f},this.ratio=function(){return matches=difflib.__reduce(function(e,t){return e+t[t.length-1]},this.get_matching_blocks(),0),difflib.__calculate_ratio(matches,this.a.length+this.b.length)},this.quick_ratio=function(){var e,t;if(this.fullbcount==null){this.fullbcount=e={};for(var n=0;n<this.b.length;n++)t=this.b[n],e[t]=difflib.__dictget(e,t,0)+1}e=this.fullbcount;var r={},i=difflib.__isindict(r),s=numb=0;for(var n=0;n<this.a.length;n++)t=this.a[n],i(t)?numb=r[t]:numb=difflib.__dictget(e,t,0),r[t]=numb-1,numb>0&&s++;return difflib.__calculate_ratio(s,this.a.length+this.b.length)},this.real_quick_ratio=function(){var e=this.a.length,t=this.b.length;return _calculate_ratio(Math.min(e,t),e+t)},this.isjunk=n?n:difflib.defaultJunkFunction,this.a=this.b=null,this.set_seqs(e,t)}},diffview={buildView:function(e){function a(e,t){var n=document.createElement(e);return n.className=t,n}function f(e,t){var n=document.createElement(e);return n.appendChild(document.createTextNode(t)),n}function l(e,t,n){var r=document.createElement(e);return r.className=t,r.appendChild(document.createTextNode(n)),r}function v(e,t,n,r,i){return t<n?(e.appendChild(f("th",(t+1).toString())),e.appendChild(l("td",i,r[t].replace(/\t/g,"\u00a0\u00a0\u00a0\u00a0"))),t+1):(e.appendChild(document.createElement("th")),e.appendChild(a("td","empty")),t)}function m(e,t,n,r,i){e.appendChild(f("th",t==null?"":(t+1).toString())),e.appendChild(f("th",n==null?"":(n+1).toString())),e.appendChild(l("td",i,r[t!=null?t:n].replace(/\t/g,"\u00a0\u00a0\u00a0\u00a0")))}var t=e.baseTextLines,n=e.newTextLines,r=e.opcodes,i=e.baseTextName?e.baseTextName:"Base Text",s=e.newTextName?e.newTextName:"New Text",o=e.contextSize,u=e.viewType==0||e.viewType==1?e.viewType:0;if(t==null)throw"Cannot build diff view; baseTextLines is not defined.";if(n==null)throw"Cannot build diff view; newTextLines is not defined.";if(!r)throw"Canno build diff view; opcodes is not defined.";var c=document.createElement("thead"),h=document.createElement("tr");c.appendChild(h),u?(h.appendChild(document.createElement("th")),h.appendChild(document.createElement("th")),h.appendChild(l("th","texttitle",i+" vs. "+s))):(h.appendChild(document.createElement("th")),h.appendChild(l("th","texttitle",i)),h.appendChild(document.createElement("th")),h.appendChild(l("th","texttitle",s))),c=[c];var p=[],d;for(var g=0;g<r.length;g++){code=r[g],change=code[0];var y=code[1],b=code[2],w=code[3],E=code[4],S=Math.max(b-y,E-w),x=[],T=[];for(var N=0;N<S;N++){if(o&&r.length>1&&(g>0&&N==o||g==0&&N==0)&&change=="equal"){var C=S-(g==0?1:2)*o;if(C>1){x.push(h=document.createElement("tr")),y+=C,w+=C,N+=C-1,h.appendChild(f("th","...")),u||h.appendChild(l("td","skip","")),h.appendChild(f("th","...")),h.appendChild(l("td","skip",""));if(g+1==r.length)break;continue}}x.push(h=document.createElement("tr")),u?change=="insert"?m(h,null,w++,n,change):change=="replace"?(T.push(d=document.createElement("tr")),y<b&&m(h,y++,null,t,"delete"),w<E&&m(d,null,w++,n,"insert")):change=="delete"?m(h,y++,null,t,change):m(h,y++,w++,t,change):(y=v(h,y,b,t,change),w=v(h,w,E,n,change))}for(var N=0;N<x.length;N++)p.push(x[N]);for(var N=0;N<T.length;N++)p.push(T[N])}p.push(h=l("th","author","diff view generated by ")),h.setAttribute("colspan",u?3:4),h.appendChild(d=f("a","jsdifflib")),d.setAttribute("href","http://github.com/cemerick/jsdifflib"),c.push(h=document.createElement("tbody"));for(var g in p)h.appendChild(p[g]);h=a("table","diff"+(u?" inlinediff":""));for(var g in c)h.appendChild(c[g]);return h}}