/*
  checked out of GitHub master HEAD on 2017-01-25 by Philip Guo
  https://github.com/cantino/selectorgadget

  added a few changes with 'pgbovine' comments ... to get
  SelectorGadget's predictions, add some code like:

window.sg_prediction = function(prediction) {
  console.log("PREDICTED CSS:", prediction);
}

*/

/*!
 * jQuery JavaScript Library v1.4.3
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Oct 14 23:10:06 2010 -0400
 */
(function() {

  window.jQuerySG = jQuery.noConflict(true);

}).call(this);

function diff_match_patch(){this.Diff_Timeout=1.0;this.Diff_EditCost=4;this.Diff_DualThreshold=32;this.Match_Balance=0.5;this.Match_Threshold=0.5;this.Match_MinLength=100;this.Match_MaxLength=1000;this.Patch_Margin=4;function getMaxBits(){var a=0;var b=1;var c=2;while(b!=c){a++;b=c;c=c<<1}return a}this.Match_MaxBits=getMaxBits()}var DIFF_DELETE=-1;var DIFF_INSERT=1;var DIFF_EQUAL=0;diff_match_patch.prototype.diff_main=function(a,b,c){if(a==b){return[[DIFF_EQUAL,a]]}if(typeof c=='undefined'){c=true}var d=c;var e=this.diff_commonPrefix(a,b);var f=a.substring(0,e);a=a.substring(e);b=b.substring(e);e=this.diff_commonSuffix(a,b);var g=a.substring(a.length-e);a=a.substring(0,a.length-e);b=b.substring(0,b.length-e);var h=this.diff_compute(a,b,d);if(f){h.unshift([DIFF_EQUAL,f])}if(g){h.push([DIFF_EQUAL,g])}this.diff_cleanupMerge(h);return h};diff_match_patch.prototype.diff_compute=function(b,c,d){var e;if(!b){return[[DIFF_INSERT,c]]}if(!c){return[[DIFF_DELETE,b]]}var f=b.length>c.length?b:c;var g=b.length>c.length?c:b;var i=f.indexOf(g);if(i!=-1){e=[[DIFF_INSERT,f.substring(0,i)],[DIFF_EQUAL,g],[DIFF_INSERT,f.substring(i+g.length)]];if(b.length>c.length){e[0][0]=e[2][0]=DIFF_DELETE}return e}f=g=null;var h=this.diff_halfMatch(b,c);if(h){var k=h[0];var l=h[1];var m=h[2];var n=h[3];var o=h[4];var p=this.diff_main(k,m,d);var q=this.diff_main(l,n,d);return p.concat([[DIFF_EQUAL,o]],q)}if(d&&(b.length<100||c.length<100)){d=false}var r;if(d){var a=this.diff_linesToChars(b,c);b=a[0];c=a[1];r=a[2]}e=this.diff_map(b,c);if(!e){e=[[DIFF_DELETE,b],[DIFF_INSERT,c]]}if(d){this.diff_charsToLines(e,r);this.diff_cleanupSemantic(e);e.push([DIFF_EQUAL,'']);var s=0;var t=0;var u=0;var v='';var w='';while(s<e.length){switch(e[s][0]){case DIFF_INSERT:u++;w+=e[s][1];break;case DIFF_DELETE:t++;v+=e[s][1];break;case DIFF_EQUAL:if(t>=1&&u>=1){var a=this.diff_main(v,w,false);e.splice(s-t-u,t+u);s=s-t-u;for(var j=a.length-1;j>=0;j--){e.splice(s,0,a[j])}s=s+a.length}u=0;t=0;v='';w='';break}s++}e.pop()}return e};diff_match_patch.prototype.diff_linesToChars=function(g,h){var i=[];var j={};i[0]='';function diff_linesToCharsMunge(a){var b='';var c=0;var d=-1;var e=i.length;while(d<a.length-1){d=a.indexOf('\n',c);if(d==-1){d=a.length-1}var f=a.substring(c,d+1);c=d+1;if(j.hasOwnProperty?j.hasOwnProperty(f):(j[f]!==undefined)){b+=String.fromCharCode(j[f])}else{b+=String.fromCharCode(e);j[f]=e;i[e++]=f}}return b}var k=diff_linesToCharsMunge(g);var l=diff_linesToCharsMunge(h);return[k,l,i]};diff_match_patch.prototype.diff_charsToLines=function(a,b){for(var x=0;x<a.length;x++){var c=a[x][1];var d=[];for(var y=0;y<c.length;y++){d[y]=b[c.charCodeAt(y)]}a[x][1]=d.join('')}};diff_match_patch.prototype.diff_map=function(b,c){var e=(new Date()).getTime()+this.Diff_Timeout*1000;var f=b.length+c.length-1;var g=this.Diff_DualThreshold*2<f;var h=[];var i=[];var j={};var l={};j[1]=0;l[1]=0;var x,y;var m;var n={};var o=false;var hasOwnProperty=!!(n.hasOwnProperty);var p=(b.length+c.length)%2;for(var d=0;d<f;d++){if(this.Diff_Timeout>0&&(new Date()).getTime()>e){return null}h[d]={};for(var k=-d;k<=d;k+=2){if(k==-d||k!=d&&j[k-1]<j[k+1]){x=j[k+1]}else{x=j[k-1]+1}y=x-k;if(g){m=x+','+y;if(p&&(hasOwnProperty?n.hasOwnProperty(m):(n[m]!==undefined))){o=true}if(!p){n[m]=d}}while(!o&&x<b.length&&y<c.length&&b.charAt(x)==c.charAt(y)){x++;y++;if(g){m=x+','+y;if(p&&(hasOwnProperty?n.hasOwnProperty(m):(n[m]!==undefined))){o=true}if(!p){n[m]=d}}}j[k]=x;h[d][x+','+y]=true;if(x==b.length&&y==c.length){return this.diff_path1(h,b,c)}else if(o){i=i.slice(0,n[m]+1);var a=this.diff_path1(h,b.substring(0,x),c.substring(0,y));return a.concat(this.diff_path2(i,b.substring(x),c.substring(y)))}}if(g){i[d]={};for(var k=-d;k<=d;k+=2){if(k==-d||k!=d&&l[k-1]<l[k+1]){x=l[k+1]}else{x=l[k-1]+1}y=x-k;m=(b.length-x)+','+(c.length-y);if(!p&&(hasOwnProperty?n.hasOwnProperty(m):(n[m]!==undefined))){o=true}if(p){n[m]=d}while(!o&&x<b.length&&y<c.length&&b.charAt(b.length-x-1)==c.charAt(c.length-y-1)){x++;y++;m=(b.length-x)+','+(c.length-y);if(!p&&(hasOwnProperty?n.hasOwnProperty(m):(n[m]!==undefined))){o=true}if(p){n[m]=d}}l[k]=x;i[d][x+','+y]=true;if(o){h=h.slice(0,n[m]+1);var a=this.diff_path1(h,b.substring(0,b.length-x),c.substring(0,c.length-y));return a.concat(this.diff_path2(i,b.substring(b.length-x),c.substring(c.length-y)))}}}}return null};diff_match_patch.prototype.diff_path1=function(a,b,c){var e=[];var x=b.length;var y=c.length;var f=null;for(var d=a.length-2;d>=0;d--){while(1){if(a[d].hasOwnProperty?a[d].hasOwnProperty((x-1)+','+y):(a[d][(x-1)+','+y]!==undefined)){x--;if(f===DIFF_DELETE){e[0][1]=b.charAt(x)+e[0][1]}else{e.unshift([DIFF_DELETE,b.charAt(x)])}f=DIFF_DELETE;break}else if(a[d].hasOwnProperty?a[d].hasOwnProperty(x+','+(y-1)):(a[d][x+','+(y-1)]!==undefined)){y--;if(f===DIFF_INSERT){e[0][1]=c.charAt(y)+e[0][1]}else{e.unshift([DIFF_INSERT,c.charAt(y)])}f=DIFF_INSERT;break}else{x--;y--;if(f===DIFF_EQUAL){e[0][1]=b.charAt(x)+e[0][1]}else{e.unshift([DIFF_EQUAL,b.charAt(x)])}f=DIFF_EQUAL}}}return e};diff_match_patch.prototype.diff_path2=function(a,b,c){var e=[];var f=0;var x=b.length;var y=c.length;var g=null;for(var d=a.length-2;d>=0;d--){while(1){if(a[d].hasOwnProperty?a[d].hasOwnProperty((x-1)+','+y):(a[d][(x-1)+','+y]!==undefined)){x--;if(g===DIFF_DELETE){e[f-1][1]+=b.charAt(b.length-x-1)}else{e[f++]=[DIFF_DELETE,b.charAt(b.length-x-1)]}g=DIFF_DELETE;break}else if(a[d].hasOwnProperty?a[d].hasOwnProperty(x+','+(y-1)):(a[d][x+','+(y-1)]!==undefined)){y--;if(g===DIFF_INSERT){e[f-1][1]+=c.charAt(c.length-y-1)}else{e[f++]=[DIFF_INSERT,c.charAt(c.length-y-1)]}g=DIFF_INSERT;break}else{x--;y--;if(g===DIFF_EQUAL){e[f-1][1]+=b.charAt(b.length-x-1)}else{e[f++]=[DIFF_EQUAL,b.charAt(b.length-x-1)]}g=DIFF_EQUAL}}}return e};diff_match_patch.prototype.diff_commonPrefix=function(a,b){if(!a||!b||a.charCodeAt(0)!==b.charCodeAt(0)){return 0}var c=0;var d=Math.min(a.length,b.length);var e=d;var f=0;while(c<e){if(a.substring(f,e)==b.substring(f,e)){c=e;f=c}else{d=e}e=Math.floor((d-c)/2+c)}return e};diff_match_patch.prototype.diff_commonSuffix=function(a,b){if(!a||!b||a.charCodeAt(a.length-1)!==b.charCodeAt(b.length-1)){return 0}var c=0;var d=Math.min(a.length,b.length);var e=d;var f=0;while(c<e){if(a.substring(a.length-e,a.length-f)==b.substring(b.length-e,b.length-f)){c=e;f=c}else{d=e}e=Math.floor((d-c)/2+c)}return e};diff_match_patch.prototype.diff_halfMatch=function(h,k){var l=h.length>k.length?h:k;var m=h.length>k.length?k:h;if(l.length<10||m.length<1){return null}var n=this;function diff_halfMatchI(a,b,i){var c=a.substring(i,i+Math.floor(a.length/4));var j=-1;var d='';var e,best_longtext_b,best_shorttext_a,best_shorttext_b;while((j=b.indexOf(c,j+1))!=-1){var f=n.diff_commonPrefix(a.substring(i),b.substring(j));var g=n.diff_commonSuffix(a.substring(0,i),b.substring(0,j));if(d.length<g+f){d=b.substring(j-g,j)+b.substring(j,j+f);e=a.substring(0,i-g);best_longtext_b=a.substring(i+f);best_shorttext_a=b.substring(0,j-g);best_shorttext_b=b.substring(j+f)}}if(d.length>=a.length/2){return[e,best_longtext_b,best_shorttext_a,best_shorttext_b,d]}else{return null}}var o=diff_halfMatchI(l,m,Math.ceil(l.length/4));var p=diff_halfMatchI(l,m,Math.ceil(l.length/2));var q;if(!o&&!p){return null}else if(!p){q=o}else if(!o){q=p}else{q=o[4].length>p[4].length?o:p}var r,text1_b,text2_a,text2_b;if(h.length>k.length){r=q[0];text1_b=q[1];text2_a=q[2];text2_b=q[3]}else{text2_a=q[0];text2_b=q[1];r=q[2];text1_b=q[3]}var s=q[4];return[r,text1_b,text2_a,text2_b,s]};diff_match_patch.prototype.diff_cleanupSemantic=function(a){var b=false;var c=[];var d=0;var e=null;var f=0;var g=0;var h=0;while(f<a.length){if(a[f][0]==DIFF_EQUAL){c[d++]=f;g=h;h=0;e=a[f][1]}else{h+=a[f][1].length;if(e!==null&&(e.length<=g)&&(e.length<=h)){a.splice(c[d-1],0,[DIFF_DELETE,e]);a[c[d-1]+1][0]=DIFF_INSERT;d--;d--;f=d>0?c[d-1]:-1;g=0;h=0;e=null;b=true}}f++}if(b){this.diff_cleanupMerge(a)}this.diff_cleanupSemanticLossless(a)};diff_match_patch.prototype.diff_cleanupSemanticLossless=function(d){var e=/[^a-zA-Z0-9]/;var f=/\s/;var g=/[\r\n]/;var h=/\n\r?\n$/;var i=/^\r?\n\r?\n/;function diff_cleanupSemanticScore(a,b){if(!a||!b){return 5}var c=0;if(a.charAt(a.length-1).match(e)||b.charAt(0).match(e)){c++;if(a.charAt(a.length-1).match(f)||b.charAt(0).match(f)){c++;if(a.charAt(a.length-1).match(g)||b.charAt(0).match(g)){c++;if(a.match(h)||b.match(i)){c++}}}}return c}var j=1;while(j<d.length-1){if(d[j-1][0]==DIFF_EQUAL&&d[j+1][0]==DIFF_EQUAL){var k=d[j-1][1];var l=d[j][1];var m=d[j+1][1];var n=this.diff_commonSuffix(k,l);if(n){var o=l.substring(l.length-n);k=k.substring(0,k.length-n);l=o+l.substring(0,l.length-n);m=o+m}var p=k;var q=l;var r=m;var s=diff_cleanupSemanticScore(k,l)+diff_cleanupSemanticScore(l,m);while(l.charAt(0)===m.charAt(0)){k+=l.charAt(0);l=l.substring(1)+m.charAt(0);m=m.substring(1);var t=diff_cleanupSemanticScore(k,l)+diff_cleanupSemanticScore(l,m);if(t>=s){s=t;p=k;q=l;r=m}}if(d[j-1][1]!=p){if(p){d[j-1][1]=p}else{d.splice(j-1,1);j--}d[j][1]=q;if(r){d[j+1][1]=r}else{d.splice(j+1,1);j--}}}j++}};diff_match_patch.prototype.diff_cleanupEfficiency=function(a){var b=false;var c=[];var d=0;var e='';var f=0;var g=false;var h=false;var i=false;var j=false;while(f<a.length){if(a[f][0]==DIFF_EQUAL){if(a[f][1].length<this.Diff_EditCost&&(i||j)){c[d++]=f;g=i;h=j;e=a[f][1]}else{d=0;e=''}i=j=false}else{if(a[f][0]==DIFF_DELETE){j=true}else{i=true}if(e&&((g&&h&&i&&j)||((e.length<this.Diff_EditCost/2)&&(g+h+i+j)==3))){a.splice(c[d-1],0,[DIFF_DELETE,e]);a[c[d-1]+1][0]=DIFF_INSERT;d--;e='';if(g&&h){i=j=true;d=0}else{d--;f=d>0?c[d-1]:-1;i=j=false}b=true}}f++}if(b){this.diff_cleanupMerge(a)}};diff_match_patch.prototype.diff_cleanupMerge=function(a){a.push([DIFF_EQUAL,'']);var b=0;var c=0;var d=0;var e='';var f='';var g;while(b<a.length){switch(a[b][0]){case DIFF_INSERT:d++;f+=a[b][1];b++;break;case DIFF_DELETE:c++;e+=a[b][1];b++;break;case DIFF_EQUAL:if(c!==0||d!==0){if(c!==0&&d!==0){g=this.diff_commonPrefix(f,e);if(g!==0){if((b-c-d)>0&&a[b-c-d-1][0]==DIFF_EQUAL){a[b-c-d-1][1]+=f.substring(0,g)}else{a.splice(0,0,[DIFF_EQUAL,f.substring(0,g)]);b++}f=f.substring(g);e=e.substring(g)}g=this.diff_commonSuffix(f,e);if(g!==0){a[b][1]=f.substring(f.length-g)+a[b][1];f=f.substring(0,f.length-g);e=e.substring(0,e.length-g)}}if(c===0){a.splice(b-c-d,c+d,[DIFF_INSERT,f])}else if(d===0){a.splice(b-c-d,c+d,[DIFF_DELETE,e])}else{a.splice(b-c-d,c+d,[DIFF_DELETE,e],[DIFF_INSERT,f])}b=b-c-d+(c?1:0)+(d?1:0)+1}else if(b!==0&&a[b-1][0]==DIFF_EQUAL){a[b-1][1]+=a[b][1];a.splice(b,1)}else{b++}d=0;c=0;e='';f='';break}}if(a[a.length-1][1]===''){a.pop()}var h=false;b=1;while(b<a.length-1){if(a[b-1][0]==DIFF_EQUAL&&a[b+1][0]==DIFF_EQUAL){if(a[b][1].substring(a[b][1].length-a[b-1][1].length)==a[b-1][1]){a[b][1]=a[b-1][1]+a[b][1].substring(0,a[b][1].length-a[b-1][1].length);a[b+1][1]=a[b-1][1]+a[b+1][1];a.splice(b-1,1);h=true}else if(a[b][1].substring(0,a[b+1][1].length)==a[b+1][1]){a[b-1][1]+=a[b+1][1];a[b][1]=a[b][1].substring(a[b+1][1].length)+a[b+1][1];a.splice(b+1,1);h=true}}b++}if(h){this.diff_cleanupMerge(a)}};diff_match_patch.prototype.diff_xIndex=function(a,b){var c=0;var d=0;var e=0;var f=0;var x;for(x=0;x<a.length;x++){if(a[x][0]!==DIFF_INSERT){c+=a[x][1].length}if(a[x][0]!==DIFF_DELETE){d+=a[x][1].length}if(c>b){break}e=c;f=d}if(a.length!=x&&a[x][0]===DIFF_DELETE){return f}return f+(b-e)};diff_match_patch.prototype.diff_prettyHtml=function(a){var b=[];var i=0;for(var x=0;x<a.length;x++){var c=a[x][0];var d=a[x][1];var e=d.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'&para;<BR>');switch(c){case DIFF_INSERT:b[x]='<INS STYLE="background:#E6FFE6;" TITLE="i='+i+'">'+e+'</INS>';break;case DIFF_DELETE:b[x]='<DEL STYLE="background:#FFE6E6;" TITLE="i='+i+'">'+e+'</DEL>';break;case DIFF_EQUAL:b[x]='<SPAN TITLE="i='+i+'">'+e+'</SPAN>';break}if(c!==DIFF_DELETE){i+=d.length}}return b.join('')};diff_match_patch.prototype.diff_text1=function(a){var b=[];for(var x=0;x<a.length;x++){if(a[x][0]!==DIFF_INSERT){b[x]=a[x][1]}}return b.join('')};diff_match_patch.prototype.diff_text2=function(a){var b=[];for(var x=0;x<a.length;x++){if(a[x][0]!==DIFF_DELETE){b[x]=a[x][1]}}return b.join('')};diff_match_patch.prototype.diff_toDelta=function(a){var b=[];for(var x=0;x<a.length;x++){switch(a[x][0]){case DIFF_INSERT:b[x]='+'+encodeURI(a[x][1]);break;case DIFF_DELETE:b[x]='-'+a[x][1].length;break;case DIFF_EQUAL:b[x]='='+a[x][1].length;break}}return b.join('\t').replace(/\0/g,'%00').replace(/%20/g,' ')};diff_match_patch.prototype.diff_fromDelta=function(a,b){var c=[];var d=0;var e=0;b=b.replace(/%00/g,'\0');var f=b.split(/\t/g);for(var x=0;x<f.length;x++){var g=f[x].substring(1);switch(f[x].charAt(0)){case'+':try{c[d++]=[DIFF_INSERT,decodeURI(g)]}catch(ex){throw new Error('Illegal escape in diff_fromDelta: '+g);}break;case'-':case'=':var n=parseInt(g,10);if(isNaN(n)||n<0){throw new Error('Invalid number in diff_fromDelta: '+g);}var h=a.substring(e,e+=n);if(f[x].charAt(0)=='='){c[d++]=[DIFF_EQUAL,h]}else{c[d++]=[DIFF_DELETE,h]}break;default:if(f[x]){throw new Error('Invalid diff operation in diff_fromDelta: '+f[x]);}}}if(e!=a.length){throw new Error('Delta length ('+e+') does not equal source text length ('+a.length+').');}return c};diff_match_patch.prototype.match_main=function(a,b,c){c=Math.max(0,Math.min(c,a.length-b.length));if(a==b){return 0}else if(a.length===0){return null}else if(a.substring(c,c+b.length)==b){return c}else{return this.match_bitap(a,b,c)}};diff_match_patch.prototype.match_bitap=function(a,b,c){if(b.length>this.Match_MaxBits){throw new Error('Pattern too long for this browser.');}var s=this.match_alphabet(b);var f=a.length;f=Math.max(f,this.Match_MinLength);f=Math.min(f,this.Match_MaxLength);var g=this;function match_bitapScore(e,x){var d=Math.abs(c-x);return(e/b.length/g.Match_Balance)+(d/f/(1.0-g.Match_Balance))}var h=this.Match_Threshold;var i=a.indexOf(b,c);if(i!=-1){h=Math.min(match_bitapScore(0,i),h)}i=a.lastIndexOf(b,c+b.length);if(i!=-1){h=Math.min(match_bitapScore(0,i),h)}var k=1<<(b.length-1);i=null;var l,bin_mid;var m=Math.max(c+c,a.length);var n;for(var d=0;d<b.length;d++){var o=Array(a.length);l=c;bin_mid=m;while(l<bin_mid){if(match_bitapScore(d,bin_mid)<h){l=bin_mid}else{m=bin_mid}bin_mid=Math.floor((m-l)/2+l)}m=bin_mid;var p=Math.max(0,c-(bin_mid-c)-1);var q=Math.min(a.length-1,b.length+bin_mid);if(a.charAt(q)==b.charAt(b.length-1)){o[q]=(1<<(d+1))-1}else{o[q]=(1<<d)-1}for(var j=q-1;j>=p;j--){if(d===0){o[j]=((o[j+1]<<1)|1)&s[a.charAt(j)]}else{o[j]=((o[j+1]<<1)|1)&s[a.charAt(j)]|((n[j+1]<<1)|1)|((n[j]<<1)|1)|n[j+1]}if(o[j]&k){var r=match_bitapScore(d,j);if(r<=h){h=r;i=j;if(j>c){p=Math.max(0,c-(j-c))}else{break}}}}if(match_bitapScore(d+1,c)>h){break}n=o}return i};diff_match_patch.prototype.match_alphabet=function(a){var s={};for(var i=0;i<a.length;i++){s[a.charAt(i)]=0}for(var i=0;i<a.length;i++){s[a.charAt(i)]|=1<<(a.length-i-1)}return s};diff_match_patch.prototype.patch_addContext=function(a,b){var c=b.substring(a.start2,a.start2+a.length1);var d=0;while(b.indexOf(c)!=b.lastIndexOf(c)&&c.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin){d+=this.Patch_Margin;c=b.substring(a.start2-d,a.start2+a.length1+d)}d+=this.Patch_Margin;var e=b.substring(a.start2-d,a.start2);if(e!==''){a.diffs.unshift([DIFF_EQUAL,e])}var f=b.substring(a.start2+a.length1,a.start2+a.length1+d);if(f!==''){a.diffs.push([DIFF_EQUAL,f])}a.start1-=e.length;a.start2-=e.length;a.length1+=e.length+f.length;a.length2+=e.length+f.length};diff_match_patch.prototype.patch_make=function(a,b,c){var d,text2,diffs;if(typeof b=='undefined'){diffs=a;d=this.diff_text1(diffs);text2=''}else{d=a;text2=b;if(typeof c!='undefined'){diffs=c}else{diffs=this.diff_main(d,text2,true);if(diffs.length>2){this.diff_cleanupSemantic(diffs);this.diff_cleanupEfficiency(diffs)}}}if(diffs.length===0){return[]}var e=[];var f=new patch_obj();var g=0;var h=0;var i=0;var j=d;var k=d;for(var x=0;x<diffs.length;x++){var l=diffs[x][0];var m=diffs[x][1];if(!g&&l!==DIFF_EQUAL){f.start1=h;f.start2=i}switch(l){case DIFF_INSERT:f.diffs[g++]=diffs[x];f.length2+=m.length;k=k.substring(0,i)+m+k.substring(i);break;case DIFF_DELETE:f.length1+=m.length;f.diffs[g++]=diffs[x];k=k.substring(0,i)+k.substring(i+m.length);break;case DIFF_EQUAL:if(m.length<=2*this.Patch_Margin&&g&&diffs.length!=x+1){f.diffs[g++]=diffs[x];f.length1+=m.length;f.length2+=m.length}else if(m.length>=2*this.Patch_Margin){if(g){this.patch_addContext(f,j);e.push(f);f=new patch_obj();g=0;j=k}}break}if(l!==DIFF_INSERT){h+=m.length}if(l!==DIFF_DELETE){i+=m.length}}if(g){this.patch_addContext(f,j);e.push(f)}return e};diff_match_patch.prototype.patch_apply=function(a,b){if(a.length==0){return[b,[]]}var c=[];for(var x=0;x<a.length;x++){var d=a[x];var e=new patch_obj();e.diffs=d.diffs.slice();e.start1=d.start1;e.start2=d.start2;e.length1=d.length1;e.length2=d.length2;c[x]=e}a=c;var f=this.patch_addPadding(a);b=f+b+f;this.patch_splitMax(a);var g=0;var h=[];for(var x=0;x<a.length;x++){var i=a[x].start2+g;var j=this.diff_text1(a[x].diffs);var k=this.match_main(b,j,i);if(k===null){h[x]=false}else{h[x]=true;g=k-i;var l=b.substring(k,k+j.length);if(j==l){b=b.substring(0,k)+this.diff_text2(a[x].diffs)+b.substring(k+j.length)}else{var m=this.diff_main(j,l,false);this.diff_cleanupSemanticLossless(m);var n=0;var o;for(var y=0;y<a[x].diffs.length;y++){var p=a[x].diffs[y];if(p[0]!==DIFF_EQUAL){o=this.diff_xIndex(m,n)}if(p[0]===DIFF_INSERT){b=b.substring(0,k+o)+p[1]+b.substring(k+o)}else if(p[0]===DIFF_DELETE){b=b.substring(0,k+o)+b.substring(k+this.diff_xIndex(m,n+p[1].length))}if(p[0]!==DIFF_DELETE){n+=p[1].length}}}}}b=b.substring(f.length,b.length-f.length);return[b,h]};diff_match_patch.prototype.patch_addPadding=function(a){var b='';for(var x=0;x<this.Patch_Margin;x++){b+=String.fromCharCode(x)}for(var x=0;x<a.length;x++){a[x].start1+=b.length;a[x].start2+=b.length}var c=a[0];var d=c.diffs;if(d.length==0||d[0][0]!=DIFF_EQUAL){d.unshift([DIFF_EQUAL,b]);c.start1-=b.length;c.start2-=b.length;c.length1+=b.length;c.length2+=b.length}else if(b.length>d[0][1].length){var e=b.length-d[0][1].length;d[0][1]=b.substring(d[0][1].length)+d[0][1];c.start1-=e;c.start2-=e;c.length1+=e;c.length2+=e}c=a[a.length-1];d=c.diffs;if(d.length==0||d[d.length-1][0]!=DIFF_EQUAL){d.push([DIFF_EQUAL,b]);c.length1+=b.length;c.length2+=b.length}else if(b.length>d[d.length-1][1].length){var e=b.length-d[d.length-1][1].length;d[d.length-1][1]+=b.substring(0,e);c.length1+=e;c.length2+=e}return b};diff_match_patch.prototype.patch_splitMax=function(a){for(var x=0;x<a.length;x++){if(a[x].length1>this.Match_MaxBits){var b=a[x];a.splice(x,1);var c=this.Match_MaxBits;var d=b.start1;var e=b.start2;var f='';while(b.diffs.length!==0){var g=new patch_obj();var h=true;g.start1=d-f.length;g.start2=e-f.length;if(f!==''){g.length1=g.length2=f.length;g.diffs.push([DIFF_EQUAL,f])}while(b.diffs.length!==0&&g.length1<c-this.Patch_Margin){var i=b.diffs[0][0];var j=b.diffs[0][1];if(i===DIFF_INSERT){g.length2+=j.length;e+=j.length;g.diffs.push(b.diffs.shift());h=false}else{j=j.substring(0,c-g.length1-this.Patch_Margin);g.length1+=j.length;d+=j.length;if(i===DIFF_EQUAL){g.length2+=j.length;e+=j.length}else{h=false}g.diffs.push([i,j]);if(j==b.diffs[0][1]){b.diffs.shift()}else{b.diffs[0][1]=b.diffs[0][1].substring(j.length)}}}f=this.diff_text2(g.diffs);f=f.substring(f.length-this.Patch_Margin);var k=this.diff_text1(b.diffs).substring(0,this.Patch_Margin);if(k!==''){g.length1+=k.length;g.length2+=k.length;if(g.diffs.length!==0&&g.diffs[g.diffs.length-1][0]===DIFF_EQUAL){g.diffs[g.diffs.length-1][1]+=k}else{g.diffs.push([DIFF_EQUAL,k])}}if(!h){a.splice(x++,0,g)}}}}};diff_match_patch.prototype.patch_toText=function(a){var b=[];for(var x=0;x<a.length;x++){b[x]=a[x]}return b.join('')};diff_match_patch.prototype.patch_fromText=function(a){var b=[];if(!a){return b}a=a.replace(/%00/g,'\0');var c=a.split('\n');var d=0;while(d<c.length){var m=c[d].match(/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/);if(!m){throw new Error('Invalid patch string: '+c[d]);}var e=new patch_obj();b.push(e);e.start1=parseInt(m[1],10);if(m[2]===''){e.start1--;e.length1=1}else if(m[2]=='0'){e.length1=0}else{e.start1--;e.length1=parseInt(m[2],10)}e.start2=parseInt(m[3],10);if(m[4]===''){e.start2--;e.length2=1}else if(m[4]=='0'){e.length2=0}else{e.start2--;e.length2=parseInt(m[4],10)}d++;while(d<c.length){var f=c[d].charAt(0);try{var g=decodeURI(c[d].substring(1))}catch(ex){throw new Error('Illegal escape in patch_fromText: '+g);}if(f=='-'){e.diffs.push([DIFF_DELETE,g])}else if(f=='+'){e.diffs.push([DIFF_INSERT,g])}else if(f==' '){e.diffs.push([DIFF_EQUAL,g])}else if(f=='@'){break}else if(f===''){}else{throw new Error('Invalid patch mode "'+f+'" in: '+g);}d++}}return b};function patch_obj(){this.diffs=[];this.start1=null;this.start2=null;this.length1=0;this.length2=0}patch_obj.prototype.toString=function(){var a,coords2;if(this.length1===0){a=this.start1+',0'}else if(this.length1==1){a=this.start1+1}else{a=(this.start1+1)+','+this.length1}if(this.length2===0){coords2=this.start2+',0'}else if(this.length2==1){coords2=this.start2+1}else{coords2=(this.start2+1)+','+this.length2}var b=['@@ -'+a+' +'+coords2+' @@\n'];var c;for(var x=0;x<this.diffs.length;x++){switch(this.diffs[x][0]){case DIFF_INSERT:c='+';break;case DIFF_DELETE:c='-';break;case DIFF_EQUAL:c=' ';break}b[x+1]=c+encodeURI(this.diffs[x][1])+'\n'}return b.join('').replace(/\0/g,'%00').replace(/%20/g,' ')};

/*
 The MIT License

 Copyright (c) 2012 Andrew Cantino
 Copyright (c) 2009 Andrew Cantino & Kyle Maxwell

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/


(function() {
  var DomPredictionHelper;

  window.DomPredictionHelper = DomPredictionHelper = (function() {

    function DomPredictionHelper() {}

    DomPredictionHelper.prototype.recursiveNodes = function(e) {
      var n;
      if (e.nodeName && e.parentNode && e !== document.body) {
        n = this.recursiveNodes(e.parentNode);
      } else {
        n = new Array();
      }
      n.push(e);
      return n;
    };

    DomPredictionHelper.prototype.escapeCssNames = function(name) {
      if (name) {
        try {
          return name.replace(/\bselectorgadget_\w+\b/g, '').replace(/\\/g, '\\\\').replace(/[\#\;\&\,\.\+\*\~\'\:\"\!\^\$\[\]\(\)\=\>\|\/]/g, function(e) {
            return '\\' + e;
          }).replace(/\s+/, '');
        } catch (e) {
          if (window.console) {
            console.log('---');
            console.log("exception in escapeCssNames");
            console.log(name);
            console.log('---');
          }
          return '';
        }
      } else {
        return '';
      }
    };

    DomPredictionHelper.prototype.childElemNumber = function(elem) {
      var count;
      count = 0;
      while (elem.previousSibling && (elem = elem.previousSibling)) {
        if (elem.nodeType === 1) {
          count++;
        }
      }
      return count;
    };

    DomPredictionHelper.prototype.siblingsWithoutTextNodes = function(e) {
      var filtered_nodes, node, nodes, _i, _len;
      nodes = e.parentNode.childNodes;
      filtered_nodes = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        if (node.nodeName.substring(0, 1) === "#") {
          continue;
        }
        if (node === e) {
          break;
        }
        filtered_nodes.push(node);
      }
      return filtered_nodes;
    };

    DomPredictionHelper.prototype.pathOf = function(elem) {
      var e, j, path, siblings, _i, _len, _ref;
      path = "";
      _ref = this.recursiveNodes(elem);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (e) {
          siblings = this.siblingsWithoutTextNodes(e);
          if (e.nodeName.toLowerCase() !== "body") {
            j = siblings.length - 2 < 0 ? 0 : siblings.length - 2;
            while (j < siblings.length) {
              if (siblings[j] === e) {
                break;
              }
              if (!siblings[j].nodeName.match(/^(script|#.*?)$/i)) {
                path += this.cssDescriptor(siblings[j]) + (j + 1 === siblings.length ? "+ " : "~ ");
              }
              j++;
            }
          }
          path += this.cssDescriptor(e) + " > ";
        }
      }
      return this.cleanCss(path);
    };

    DomPredictionHelper.prototype.cssDescriptor = function(node) {
      var cssName, escaped, path, _i, _len, _ref;
      path = node.nodeName.toLowerCase();
      escaped = node.id && this.escapeCssNames(new String(node.id));
      if (escaped && escaped.length > 0) {
        path += '#' + escaped;
      }
      if (node.className) {
        _ref = node.className.split(" ");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cssName = _ref[_i];
          escaped = this.escapeCssNames(cssName);
          if (cssName && escaped.length > 0) {
            path += '.' + escaped;
          }
        }
      }
      if (node.nodeName.toLowerCase() !== "body") {
        path += ':nth-child(' + (this.childElemNumber(node) + 1) + ')';
      }
      return path;
    };

    DomPredictionHelper.prototype.cssDiff = function(array) {
      var collective_common, cssElem, diff, dmp, encoded_css_array, existing_tokens, part, _i, _j, _len, _len1;
      try {
        dmp = new diff_match_patch();
      } catch (e) {
        throw "Please include the diff_match_patch library.";
      }
      if (typeof array === 'undefined' || array.length === 0) {
        return '';
      }
      existing_tokens = {};
      encoded_css_array = this.encodeCssForDiff(array, existing_tokens);
      collective_common = encoded_css_array.pop();
      for (_i = 0, _len = encoded_css_array.length; _i < _len; _i++) {
        cssElem = encoded_css_array[_i];
        diff = dmp.diff_main(collective_common, cssElem);
        collective_common = '';
        for (_j = 0, _len1 = diff.length; _j < _len1; _j++) {
          part = diff[_j];
          if (part[0] === 0) {
            collective_common += part[1];
          }
        }
      }
      return this.decodeCss(collective_common, existing_tokens);
    };

    DomPredictionHelper.prototype.tokenizeCss = function(css_string) {
      var char, skip, tokens, word, _i, _len, _ref;
      skip = false;
      word = '';
      tokens = [];
      _ref = this.cleanCss(css_string);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        char = _ref[_i];
        if (skip) {
          skip = false;
        } else if (char === '\\') {
          skip = true;
        } else if (char === '.' || char === ' ' || char === '#' || char === '>' || char === ':' || char === ',' || char === '+' || char === '~') {
          if (word.length > 0) {
            tokens.push(word);
          }
          word = '';
        }
        word += char;
        if (char === ' ' || char === ',') {
          tokens.push(word);
          word = '';
        }
      }
      if (word.length > 0) {
        tokens.push(word);
      }
      return tokens;
    };

    DomPredictionHelper.prototype.tokenizeCssForDiff = function(css_string) {
      var block, combined_tokens, token, _i, _len, _ref;
      combined_tokens = [];
      block = [];
      _ref = this.tokenizeCss(css_string);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        token = _ref[_i];
        block.push(token);
        if (token === ' ' && block.length > 0) {
          combined_tokens = combined_tokens.concat(block);
          block = [];
        } else if (token === '+' || token === '~') {
          block = [block.join('')];
        }
      }
      if (block.length > 0) {
        return combined_tokens.concat(block);
      } else {
        return combined_tokens;
      }
    };

    DomPredictionHelper.prototype.decodeCss = function(string, existing_tokens) {
      var character, inverted, out, _i, _len, _ref;
      inverted = this.invertObject(existing_tokens);
      out = '';
      _ref = string.split('');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        character = _ref[_i];
        out += inverted[character];
      }
      return this.cleanCss(out);
    };

    DomPredictionHelper.prototype.encodeCssForDiff = function(strings, existing_tokens) {
      var codepoint, out, string, strings_out, token, _i, _j, _len, _len1, _ref;
      codepoint = 50;
      strings_out = [];
      for (_i = 0, _len = strings.length; _i < _len; _i++) {
        string = strings[_i];
        out = new String();
        _ref = this.tokenizeCssForDiff(string);
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          token = _ref[_j];
          if (!existing_tokens[token]) {
            existing_tokens[token] = String.fromCharCode(codepoint++);
          }
          out += existing_tokens[token];
        }
        strings_out.push(out);
      }
      return strings_out;
    };

    DomPredictionHelper.prototype.tokenPriorities = function(tokens) {
      var epsilon, first, i, priorities, second, token, _i, _len;
      epsilon = 0.001;
      priorities = new Array();
      i = 0;
      for (_i = 0, _len = tokens.length; _i < _len; _i++) {
        token = tokens[_i];
        first = token.substring(0, 1);
        second = token.substring(1, 2);
        if (first === ':' && second === 'n') {
          priorities[i] = 0;
        } else if (first === '>') {
          priorities[i] = 2;
        } else if (first === '+' || first === '~') {
          priorities[i] = 3;
        } else if (first !== ':' && first !== '.' && first !== '#' && first !== ' ' && first !== '>' && first !== '+' && first !== '~') {
          priorities[i] = 4;
        } else if (first === '.') {
          priorities[i] = 5;
        } else if (first = '#') {
          priorities[i] = 6;
          if (token.match(/\d{3,}/)) {
            priorities[i] = 2.5;
          }
        } else {
          priorities[i] = 0;
        }
        priorities[i] += i * epsilon;
        i++;
      }
      return priorities;
    };

    DomPredictionHelper.prototype.orderFromPriorities = function(priorities) {
      var i, ordering, tmp, _i, _j, _ref, _ref1;
      tmp = new Array();
      ordering = new Array();
      for (i = _i = 0, _ref = priorities.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        tmp[i] = {
          value: priorities[i],
          original: i
        };
      }
      tmp.sort(function(a, b) {
        return a.value - b.value;
      });
      for (i = _j = 0, _ref1 = priorities.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        ordering[i] = tmp[i].original;
      }
      return ordering;
    };

    DomPredictionHelper.prototype.simplifyCss = function(css, selected, rejected) {
      var best_so_far, first, got_shorter, i, look_back_index, ordering, part, parts, priorities, second, selector, _i, _ref,
        _this = this;
      parts = this.tokenizeCss(css);
      priorities = this.tokenPriorities(parts);
      ordering = this.orderFromPriorities(priorities);
      selector = this.cleanCss(css);
      look_back_index = -1;
      best_so_far = "";
      if (this.selectorGets('all', selected, selector) && this.selectorGets('none', rejected, selector)) {
        best_so_far = selector;
      }
      got_shorter = true;
      while (got_shorter) {
        got_shorter = false;
        for (i = _i = 0, _ref = parts.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          part = ordering[i];
          if (parts[part].length === 0) {
            continue;
          }
          first = parts[part].substring(0, 1);
          second = parts[part].substring(1, 2);
          if (first === ' ') {
            continue;
          }
          if (this.wouldLeaveFreeFloatingNthChild(parts, part)) {
            continue;
          }
          this._removeElements(part, parts, first, function(selector) {
            if (_this.selectorGets('all', selected, selector) && _this.selectorGets('none', rejected, selector) && (selector.length < best_so_far.length || best_so_far.length === 0)) {
              best_so_far = selector;
              got_shorter = true;
              return true;
            } else {
              return false;
            }
          });
        }
      }
      return this.cleanCss(best_so_far);
    };

    DomPredictionHelper.prototype._removeElements = function(part, parts, firstChar, callback) {
      var j, look_back_index, selector, tmp, _i, _j;
      if (firstChar === '+' || firstChar === '~') {
        look_back_index = this.positionOfSpaceBeforeIndexOrLineStart(part, parts);
      } else {
        look_back_index = part;
      }
      tmp = parts.slice(look_back_index, part + 1);
      for (j = _i = look_back_index; look_back_index <= part ? _i <= part : _i >= part; j = look_back_index <= part ? ++_i : --_i) {
        parts[j] = '';
      }
      selector = this.cleanCss(parts.join(''));
      if (selector === '' || !callback(selector)) {
        for (j = _j = look_back_index; look_back_index <= part ? _j <= part : _j >= part; j = look_back_index <= part ? ++_j : --_j) {
          parts[j] = tmp[j - look_back_index];
        }
      }
      return parts;
    };

    DomPredictionHelper.prototype.positionOfSpaceBeforeIndexOrLineStart = function(part, parts) {
      var i;
      i = part;
      while (i >= 0 && parts[i] !== ' ') {
        i--;
      }
      if (i < 0) {
        i = 0;
      }
      return i;
    };

    DomPredictionHelper.prototype.wouldLeaveFreeFloatingNthChild = function(parts, part) {
      var i, nth_child_is_on_right, space_is_on_left;
      space_is_on_left = nth_child_is_on_right = false;
      i = part + 1;
      while (i < parts.length && parts[i].length === 0) {
        i++;
      }
      if (i < parts.length && parts[i].substring(0, 2) === ':n') {
        nth_child_is_on_right = true;
      }
      i = part - 1;
      while (i > -1 && parts[i].length === 0) {
        i--;
      }
      if (i < 0 || parts[i] === ' ') {
        space_is_on_left = true;
      }
      return space_is_on_left && nth_child_is_on_right;
    };

    DomPredictionHelper.prototype.cleanCss = function(css) {
      var cleaned_css, last_cleaned_css;
      cleaned_css = css;
      last_cleaned_css = null;
      while (last_cleaned_css !== cleaned_css) {
        last_cleaned_css = cleaned_css;
        cleaned_css = cleaned_css.replace(/(^|\s+)(\+|\~)/, '').replace(/(\+|\~)\s*$/, '').replace(/>/g, ' > ').replace(/\s*(>\s*)+/g, ' > ').replace(/,/g, ' , ').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '').replace(/\s*,$/g, '').replace(/^\s*,\s*/g, '').replace(/\s*>$/g, '').replace(/^>\s*/g, '').replace(/[\+\~\>]\s*,/g, ',').replace(/[\+\~]\s*>/g, '>').replace(/\s*(,\s*)+/g, ' , ');
      }
      return cleaned_css;
    };

    DomPredictionHelper.prototype.getPathsFor = function(nodeset) {
      var node, out, _i, _len;
      out = [];
      for (_i = 0, _len = nodeset.length; _i < _len; _i++) {
        node = nodeset[_i];
        if (node && node.nodeName) {
          out.push(this.pathOf(node));
        }
      }
      return out;
    };

    DomPredictionHelper.prototype.predictCss = function(s, r) {
      var css, selected, selected_paths, simplest, union, _i, _len;
      if (s.length === 0) {
        return '';
      }
      selected_paths = this.getPathsFor(s);
      css = this.cssDiff(selected_paths);
      simplest = this.simplifyCss(css, s, r);
      if (simplest.length > 0) {
        return simplest;
      }
      union = '';
      for (_i = 0, _len = s.length; _i < _len; _i++) {
        selected = s[_i];
        union = this.pathOf(selected) + ", " + union;
      }
      union = this.cleanCss(union);
      return this.simplifyCss(union, s, r);
    };

    DomPredictionHelper.prototype.selectorGets = function(type, list, the_selector) {
      if (list.length === 0 && type === 'all') {
        return false;
      }
      if (list.length === 0 && type === 'none') {
        return true;
      }
      try {
        if (type === 'all') {
          return list.not(the_selector).length === 0;
        } else {
          return !(list.is(the_selector));
        }
      } catch (e) {
        if (window.console) {
          console.log("Error on selector: " + the_selector);
        }
        throw e;
      }
    };

    DomPredictionHelper.prototype.invertObject = function(object) {
      var key, new_object, value;
      new_object = {};
      for (key in object) {
        value = object[key];
        new_object[value] = key;
      }
      return new_object;
    };

    DomPredictionHelper.prototype.cssToXPath = function(css_string) {
      var css_block, out, token, tokens, _i, _len;
      tokens = this.tokenizeCss(css_string);
      if (tokens[0] && tokens[0] === ' ') {
        tokens.splice(0, 1);
      }
      if (tokens[tokens.length - 1] && tokens[tokens.length - 1] === ' ') {
        tokens.splice(tokens.length - 1, 1);
      }
      css_block = [];
      out = "";
      for (_i = 0, _len = tokens.length; _i < _len; _i++) {
        token = tokens[_i];
        if (token === ' ') {
          out += this.cssToXPathBlockHelper(css_block);
          css_block = [];
        } else {
          css_block.push(token);
        }
      }
      return out + this.cssToXPathBlockHelper(css_block);
    };

    DomPredictionHelper.prototype.cssToXPathBlockHelper = function(css_block) {
      var current, expressions, first, i, out, re, rest, _i, _j, _len, _ref;
      if (css_block.length === 0) {
        return '//';
      }
      out = '//';
      first = css_block[0].substring(0, 1);
      if (first === ',') {
        return " | ";
      }
      if (first === ':' || first === '#' || first === '.') {
        out += '*';
      }
      expressions = [];
      re = null;
      for (_i = 0, _len = css_block.length; _i < _len; _i++) {
        current = css_block[_i];
        first = current.substring(0, 1);
        rest = current.substring(1);
        if (first === ':') {
          if (re = rest.match(/^nth-child\((\d+)\)$/)) {
            expressions.push('(((count(preceding-sibling::*) + 1) = ' + re[1] + ') and parent::*)');
          }
        } else if (first === '.') {
          expressions.push('contains(concat( " ", @class, " " ), concat( " ", "' + rest + '", " " ))');
        } else if (first === '#') {
          expressions.push('(@id = "' + rest + '")');
        } else if (first === ',') {

        } else {
          out += current;
        }
      }
      if (expressions.length > 0) {
        out += '[';
      }
      for (i = _j = 0, _ref = expressions.length; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
        out += expressions[i];
        if (i < expressions.length - 1) {
          out += ' and ';
        }
      }
      if (expressions.length > 0) {
        out += ']';
      }
      return out;
    };

    return DomPredictionHelper;

  })();

}).call(this);


/*
 The MIT License

 Copyright (c) 2012 Andrew Cantino
 Copyright (c) 2009 Andrew Cantino & Kyle Maxwell

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/


(function() {
  var SelectorGadget;

  window.SelectorGadget = SelectorGadget = (function() {

    function SelectorGadget() {}

    SelectorGadget.prototype.border_width = 5;

    SelectorGadget.prototype.border_padding = 2;

    SelectorGadget.prototype.b_top = null;

    SelectorGadget.prototype.b_left = null;

    SelectorGadget.prototype.b_right = null;

    SelectorGadget.prototype.b_bottom = null;

    SelectorGadget.prototype.selected = [];

    SelectorGadget.prototype.rejected = [];

    SelectorGadget.prototype.special_mode = null;

    SelectorGadget.prototype.path_output_field = null;

    SelectorGadget.prototype.sg_div = null;

    SelectorGadget.prototype.ignore_class = 'selectorgadget_ignore';

    SelectorGadget.prototype.unbound = false;

    SelectorGadget.prototype.prediction_helper = new DomPredictionHelper();

    SelectorGadget.prototype.restricted_elements = jQuerySG.map(['html', 'body', 'head', 'base'], function(selector) {
      return jQuerySG(selector).get(0);
    });

    SelectorGadget.prototype.makeBorders = function(orig_elem, makeRed) {
      var elem, height, left, p, path_to_show, top, width;
      this.removeBorders();
      this.setupBorders();
      if (orig_elem.parentNode) {
        path_to_show = orig_elem.parentNode.tagName.toLowerCase() + ' ' + orig_elem.tagName.toLowerCase();
      } else {
        path_to_show = orig_elem.tagName.toLowerCase();
      }
      elem = jQuerySG(orig_elem);
      p = elem.offset();
      top = p.top;
      left = p.left;
      width = elem.outerWidth();
      height = elem.outerHeight();
      this.b_top.css('width', this.px(width + this.border_padding * 2 + this.border_width * 2)).css('top', this.px(top - this.border_width - this.border_padding)).css('left', this.px(left - this.border_padding - this.border_width));
      this.b_bottom.css('width', this.px(width + this.border_padding * 2 + this.border_width * 2 - 5)).css('top', this.px(top + height + this.border_padding)).css('left', this.px(left - this.border_padding - this.border_width)).text(path_to_show);
      this.b_left.css('height', this.px(height + this.border_padding * 2)).css('top', this.px(top - this.border_padding)).css('left', this.px(left - this.border_padding - this.border_width));
      this.b_right.css('height', this.px(height + this.border_padding * 2)).css('top', this.px(top - this.border_padding)).css('left', this.px(left + width + this.border_padding));
      this.b_right.get(0).target_elem = this.b_left.get(0).target_elem = this.b_top.get(0).target_elem = this.b_bottom.get(0).target_elem = orig_elem;
      if (makeRed || elem.hasClass("selectorgadget_suggested") || elem.hasClass("selectorgadget_selected")) {
        this.b_top.addClass('selectorgadget_border_red');
        this.b_bottom.addClass('selectorgadget_border_red');
        this.b_left.addClass('selectorgadget_border_red');
        this.b_right.addClass('selectorgadget_border_red');
      } else {
        if (this.b_top.hasClass('selectorgadget_border_red')) {
          this.b_top.removeClass('selectorgadget_border_red');
          this.b_bottom.removeClass('selectorgadget_border_red');
          this.b_left.removeClass('selectorgadget_border_red');
          this.b_right.removeClass('selectorgadget_border_red');
        }
      }
      return this.showBorders();
    };

    SelectorGadget.prototype.px = function(p) {
      return p + 'px';
    };

    SelectorGadget.prototype.showBorders = function() {
      this.b_top.show();
      this.b_bottom.show();
      this.b_left.show();
      return this.b_right.show();
    };

    SelectorGadget.prototype.removeBorders = function() {
      if (this.b_top) {
        this.b_top.hide();
        this.b_bottom.hide();
        this.b_left.hide();
        return this.b_right.hide();
      }
    };

    SelectorGadget.prototype.setupBorders = function() {
      var width;
      if (!this.b_top) {
        width = this.border_width + 'px';
        this.b_top = jQuerySG('<div>').addClass('selectorgadget_border').css('height', width).hide().bind("mousedown.sg", {
          'self': this
        }, this.sgMousedown);
        this.b_bottom = jQuerySG('<div>').addClass('selectorgadget_border').addClass('selectorgadget_bottom_border').css('height', this.px(this.border_width + 6)).hide().bind("mousedown.sg", {
          'self': this
        }, this.sgMousedown);
        this.b_left = jQuerySG('<div>').addClass('selectorgadget_border').css('width', width).hide().bind("mousedown.sg", {
          'self': this
        }, this.sgMousedown);
        this.b_right = jQuerySG('<div>').addClass('selectorgadget_border').css('width', width).hide().bind("mousedown.sg", {
          'self': this
        }, this.sgMousedown);
        return this.addBorderToDom();
      }
    };

    SelectorGadget.prototype.addBorderToDom = function() {
      document.body.appendChild(this.b_top.get(0));
      document.body.appendChild(this.b_bottom.get(0));
      document.body.appendChild(this.b_left.get(0));
      return document.body.appendChild(this.b_right.get(0));
    };

    SelectorGadget.prototype.removeBorderFromDom = function() {
      if (this.b_top) {
        this.b_top.remove();
        this.b_bottom.remove();
        this.b_left.remove();
        this.b_right.remove();
        return this.b_top = this.b_bottom = this.b_left = this.b_right = null;
      }
    };

    SelectorGadget.prototype.selectable = function(elem) {
      return !this.css_restriction || (this.css_restriction && jQuerySG(elem).is(this.css_restriction));
    };

    SelectorGadget.prototype.sgMouseover = function(e) {
      var gadget, parent, self;
      gadget = e.data.self;
      if (gadget.unbound) {
        return true;
      }
      if (this === document.body || this === document.body.parentNode) {
        return false;
      }
      self = jQuerySG(this);
      gadget.unhighlightIframes();
      if (self.is("iframe")) {
        gadget.highlightIframe(self, e);
      }
      if (gadget.special_mode !== 'd') {
        parent = gadget.firstSelectedOrSuggestedParent(this);
        if (parent !== null && parent !== this && gadget.selectable(parent)) {
          gadget.makeBorders(parent, true);
        } else {
          if (gadget.selectable(self)) {
            gadget.makeBorders(this);
          }
        }
      } else {
        if (!jQuerySG('.selectorgadget_selected', this).get(0)) {
          if (gadget.selectable(self)) {
            gadget.makeBorders(this);
          }
        }
      }
      return false;
    };

    SelectorGadget.prototype.firstSelectedOrSuggestedParent = function(elem) {
      var orig;
      orig = elem;
      if (jQuerySG(elem).hasClass('selectorgadget_suggested') || jQuerySG(elem).hasClass('selectorgadget_selected')) {
        return elem;
      }
      while (elem.parentNode && (elem = elem.parentNode)) {
        if (jQuerySG.inArray(elem, this.restricted_elements) === -1) {
          if (jQuerySG(elem).hasClass('selectorgadget_suggested') || jQuerySG(elem).hasClass('selectorgadget_selected')) {
            return elem;
          }
        }
      }
      return null;
    };

    SelectorGadget.prototype.sgMouseout = function(e) {
      var elem, gadget;
      gadget = e.data.self;
      if (gadget.unbound) {
        return true;
      }
      if (this === document.body || this === document.body.parentNode) {
        return false;
      }
      elem = jQuerySG(this);
      gadget.removeBorders();
      return false;
    };

    SelectorGadget.prototype.highlightIframe = function(elem, click) {
      var block, instructions, p, self, src, target;
      p = elem.offset();
      self = this;
      target = jQuerySG(click.target);
      block = jQuerySG('<div>').css('position', 'absolute').css('z-index', '99998').css('width', this.px(elem.outerWidth())).css('height', this.px(elem.outerHeight())).css('top', this.px(p.top)).css('left', this.px(p.left)).css('background-color', '#AAA').css('opacity', '0.6').addClass("selectorgadget_iframe").addClass('selectorgadget_clean');
      instructions = jQuerySG("<div><span>This is an iframe.  To select in it, </span></div>").addClass("selectorgadget_iframe_info").addClass("selectorgadget_iframe").addClass('selectorgadget_clean');
      instructions.css({
        width: "200px",
        border: "1px solid #888"
      }, {
        padding: "5px",
        "background-color": "white",
        position: "absolute",
        "z-index": "99999",
        top: this.px(p.top + (elem.outerHeight() / 4.0)),
        left: this.px(p.left + (elem.outerWidth() - 200) / 2.0),
        height: "150px"
      });
      src = null;
      try {
        src = elem.contents().get(0).location.href;
      } catch (e) {
        src = elem.attr("src");
      }
      instructions.append(jQuerySG("<a target='_top'>click here to open it</a>").attr("href", src));
      instructions.append(jQuerySG("<span>, then relaunch SelectorGadget.</span>"));
      document.body.appendChild(instructions.get(0));
      block.click(function() {
        if (self.selectable(target)) {
          return target.mousedown();
        }
      });
      return document.body.appendChild(block.get(0));
    };

    SelectorGadget.prototype.unhighlightIframes = function(elem, click) {
      return jQuerySG(".selectorgadget_iframe").remove();
    };

    SelectorGadget.prototype.sgMousedown = function(e) {
      var elem, gadget, potential_elem, prediction, w_elem;
      gadget = e.data.self;
      if (gadget.unbound) {
        return true;
      }
      elem = this;
      w_elem = jQuerySG(elem);
      if (w_elem.hasClass('selectorgadget_border')) {
        elem = elem.target_elem || elem;
        w_elem = jQuerySG(elem);
      }
      if (elem === document.body || elem === document.body.parentNode) {
        return;
      }
      if (gadget.special_mode !== 'd') {
        potential_elem = gadget.firstSelectedOrSuggestedParent(elem);
        if (potential_elem !== null && potential_elem !== elem) {
          elem = potential_elem;
          w_elem = jQuerySG(elem);
        }
      } else {
        if (jQuerySG('.selectorgadget_selected', this).get(0)) {
          gadget.blockClicksOn(elem);
        }
      }
      if (!gadget.selectable(w_elem)) {
        gadget.removeBorders();
        gadget.blockClicksOn(elem);
        return false;
      }
      if (w_elem.hasClass('selectorgadget_selected')) {
        w_elem.removeClass('selectorgadget_selected');
        gadget.selected.splice(jQuerySG.inArray(elem, gadget.selected), 1);
      } else if (w_elem.hasClass("selectorgadget_rejected")) {
        w_elem.removeClass('selectorgadget_rejected');
        gadget.rejected.splice(jQuerySG.inArray(elem, gadget.rejected), 1);
      } else if (w_elem.hasClass("selectorgadget_suggested")) {
        w_elem.addClass('selectorgadget_rejected');
        gadget.rejected.push(elem);
      } else {
        w_elem.addClass('selectorgadget_selected');
        gadget.selected.push(elem);
      }
      gadget.clearSuggested();
      prediction = gadget.prediction_helper.predictCss(jQuerySG(gadget.selected), jQuerySG(gadget.rejected.concat(gadget.restricted_elements)));
      gadget.suggestPredicted(prediction);
      gadget.setPath(prediction);
      gadget.removeBorders();
      gadget.blockClicksOn(elem);
      w_elem.trigger("mouseover.sg", {
        'self': gadget
      });
      return false;
    };

    SelectorGadget.prototype.setupEventHandlers = function() {
      jQuerySG("*:not(.selectorgadget_ignore)").bind("mouseover.sg", {
        'self': this
      }, this.sgMouseover);
      jQuerySG("*:not(.selectorgadget_ignore)").bind("mouseout.sg", {
        'self': this
      }, this.sgMouseout);
      jQuerySG("*:not(.selectorgadget_ignore)").bind("mousedown.sg", {
        'self': this
      }, this.sgMousedown);
      jQuerySG("html").bind("keydown.sg", {
        'self': this
      }, this.listenForActionKeys);
      return jQuerySG("html").bind("keyup.sg", {
        'self': this
      }, this.clearActionKeys);
    };

    SelectorGadget.prototype.listenForActionKeys = function(e) {
      var gadget;
      gadget = e.data.self;
      if (gadget.unbound) {
        return true;
      }
      if (e.keyCode === 16 || e.keyCode === 68) {
        gadget.special_mode = 'd';
        return gadget.removeBorders();
      }
    };

    SelectorGadget.prototype.clearActionKeys = function(e) {
      var gadget;
      gadget = e.data.self;
      if (gadget.unbound) {
        return true;
      }
      gadget.removeBorders();
      return gadget.special_mode = null;
    };

    SelectorGadget.prototype.blockClicksOn = function(elem) {
      var block, p;
      elem = jQuerySG(elem);
      p = elem.offset();
      block = jQuerySG('<div>').css('position', 'absolute').css('z-index', '9999999').css('width', this.px(elem.outerWidth())).css('height', this.px(elem.outerHeight())).css('top', this.px(p.top)).css('left', this.px(p.left)).css('background-color', '');
      document.body.appendChild(block.get(0));
      setTimeout((function() {
        return block.remove();
      }), 400);
      return false;
    };

    SelectorGadget.prototype.setMode = function(mode) {
      if (mode === 'browse') {
        this.removeEventHandlers();
      } else if (mode === 'interactive') {
        this.setupEventHandlers();
      }
      return this.clearSelected();
    };

    SelectorGadget.prototype.suggestPredicted = function(prediction) {
      var count;
      if (prediction && prediction !== '') {
        count = 0;
        jQuerySG(prediction).each(function() {
          count += 1;
          if (!jQuerySG(this).hasClass('selectorgadget_selected') && !jQuerySG(this).hasClass('selectorgadget_ignore') && !jQuerySG(this).hasClass('selectorgadget_rejected')) {
            return jQuerySG(this).addClass('selectorgadget_suggested');
          }
        });
        if (this.clear_button) {
          if (count > 0) {
            return this.clear_button.attr('value', 'Clear (' + count + ')');
          } else {
            return this.clear_button.attr('value', 'Clear');
          }
        }
      }
    };

    SelectorGadget.prototype.setPath = function(prediction) {
      if (window.sg_prediction) {
        window.sg_prediction(prediction); // added by pgbovine
      } else {
        console.warn("PGBOVINE says: you need to set window.sg_prediction to a function that does something with the predicted CSS");
      }

      if (prediction && prediction.length > 0) {
        let selected_contents = [];
        jQuerySG(prediction).each(function() {
          selected_contents.push(jQuerySG(this).text());
        });
        // return this.path_output_field.value = prediction;
        return this.path_output_field.value = selected_contents.join(', '); // added by Xiong
      } else {
        return this.path_output_field.value = 'No valid path found.';
      }
    };

    SelectorGadget.prototype.refreshFromPath = function(e) {
      var path, self;
      self = (e && e.data && e.data.self) || this;
      path = self.path_output_field.value;
      self.clearSelected();
      self.suggestPredicted(path);
      return self.setPath(path);
    };

    SelectorGadget.prototype.showXPath = function(e) {
      var path, self;
      self = (e && e.data && e.data.self) || this;
      path = self.path_output_field.value;
      if (path === 'No valid path found.') {
        return;
      }
      return prompt("The CSS selector '" + path + "' as an XPath is shown below.  Please report any bugs that you find with this converter.", self.prediction_helper.cssToXPath(path));
    };

    SelectorGadget.prototype.clearSelected = function(e) {
      var self;
      self = (e && e.data && e.data.self) || this;
      self.selected = [];
      self.rejected = [];
      jQuerySG('.selectorgadget_selected').removeClass('selectorgadget_selected');
      jQuerySG('.selectorgadget_rejected').removeClass('selectorgadget_rejected');
      self.removeBorders();
      return self.clearSuggested();
    };

    SelectorGadget.prototype.clearEverything = function(e) {
      var self;
      self = (e && e.data && e.data.self) || this;
      self.clearSelected();
      return self.resetOutputs();
    };

    SelectorGadget.prototype.resetOutputs = function() {
      return this.setPath();
    };

    SelectorGadget.prototype.clearSuggested = function() {
      jQuerySG('.selectorgadget_suggested').removeClass('selectorgadget_suggested');
      if (this.clear_button) {
        return this.clear_button.attr('value', 'Clear');
      }
    };

    SelectorGadget.prototype.showHelp = function() {
      return alert("Click on a page element that you would like your selector to match (it will turn green). SelectorGadget will then generate a minimal CSS selector for that element, and will highlight (yellow) everything that is matched by the selector. Now click on a highlighted element to reject it (red), or click on an unhighlighted element to add it (green). Through this process of selection and rejection, SelectorGadget helps you to come up with the perfect CSS selector for your needs.\n\nHolding 'shift' while moving the mouse will let you select elements inside of other selected elements.");
    };

    SelectorGadget.prototype.useRemoteInterface = function() {
      return window.sg_options && window.sg_options.remote_interface;
    };

    SelectorGadget.prototype.updateRemoteInterface = function(data_obj) {
      return this.addScript(this.composeRemoteUrl(window.sg_options.remote_interface, data_obj));
    };

    SelectorGadget.prototype.composeRemoteUrl = function(url, data_obj) {
      var key, params;
      params = (url.split("?")[1] && url.split("?")[1].split("&")) || [];
      params.push("t=" + (new Date()).getTime());
      params.push("url=" + encodeURIComponent(window.location.href));
      if (data_obj) {
        for (key in data_obj) {
          params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data_obj[key]));
        }
      }
      if (this.remote_data) {
        for (key in this.remote_data) {
          params.push(encodeURIComponent("data[" + key + "]") + '=' + encodeURIComponent(this.remote_data[key]));
        }
      }
      return url.split("?")[0] + "?" + params.join("&");
    };

    SelectorGadget.prototype.addScript = function(src) {
      var head, s;
      s = document.createElement('script');
      s.setAttribute('type', 'text/javascript');
      s.setAttribute('src', src);
      head = document.getElementsByTagName('head')[0];
      if (head) {
        return head.appendChild(s);
      } else {
        return document.body.appendChild(s);
      }
    };

    SelectorGadget.prototype.makeInterface = function() {
      this.sg_div = jQuerySG('<div>').attr('id', 'selectorgadget_main').addClass('selectorgadget_bottom').addClass('selectorgadget_ignore');
      if (this.useRemoteInterface()) {
        this.path_output_field = {
          value: null
        };
        this.remote_data = {};
        this.updateRemoteInterface();
      } else {
        this.makeStandardInterface();
      }
      return jQuerySG('body').append(this.sg_div);
    };

    SelectorGadget.prototype.makeStandardInterface = function() {
      var path, self;
      self = this;
      path = jQuerySG('<input>').attr('id', 'selectorgadget_path_field').addClass('selectorgadget_ignore').addClass('selectorgadget_input_field').keydown(function(e) {
        if (e.keyCode === 13) {
          return self.refreshFromPath(e);
        }
      }).focus(function() {
        return jQuerySG(this).select();
      });
      this.sg_div.append(path);

      this.clear_button = jQuerySG('<input type="button" value="Clear"/>').bind("click", {
        'self': this
      }, this.clearEverything).addClass('selectorgadget_ignore').addClass('selectorgadget_input_field');
      this.sg_div.append(this.clear_button);

      // this.sg_div.append(jQuerySG('<input type="button" value="Toggle Position"/>').click(function() {
      //   if (self.sg_div.hasClass('selectorgadget_top')) {
      //     return self.sg_div.removeClass('selectorgadget_top').addClass('selectorgadget_bottom');
      //   } else {
      //     return self.sg_div.removeClass('selectorgadget_bottom').addClass('selectorgadget_top');
      //   }
      // }).addClass('selectorgadget_ignore').addClass('selectorgadget_input_field'));

      // this.sg_div.append(jQuerySG('<input type="button" value="XPath"/>').bind("click", {
      //   'self': this
      // }, this.showXPath).addClass('selectorgadget_ignore').addClass('selectorgadget_input_field'));

      // this.sg_div.append(jQuerySG('<input type="button" value="?"/>').bind("click", {
      //   'self': this
      // }, this.showHelp).addClass('selectorgadget_ignore').addClass('selectorgadget_input_field'));

      this.sg_div.append(jQuerySG('<input type="button" value="Done"/>').bind("click", {
        'self': this
      }, this.unbindAndRemoveInterface).addClass('selectorgadget_ignore').addClass('selectorgadget_input_field'));
      return this.path_output_field = path.get(0);
    };

    SelectorGadget.prototype.removeInterface = function(e) {
      // added by Xiong
      let selected = [];
        jQuerySG(window.last_prediction).each(function() {
            selected.push(jQuerySG(this).text());
        });
      // console.log(this.datai);
      // console.log(selected);
      selected = '[' + selected.map(x => `'${x}'`).join(', ') + ']';
      let editor = ace.edit(`editor-${this.datai}-${this.envi}`);
      let pos = editor.getCursorPosition();
      editor.getSession().getDocument().insert(pos, selected);
      // added by Xiong

        this.sg_div.remove();
        return this.sg_div = null;
    };

    SelectorGadget.prototype.unbind = function(e) {
      var self;
      self = (e && e.data && e.data.self) || this;
      self.unbound = true;
      self.removeBorderFromDom();
      return self.clearSelected();
    };

    SelectorGadget.prototype.unbindAndRemoveInterface = function(e) {
      var self;
      self = (e && e.data && e.data.self) || this;
      self.unbind();
      return self.removeInterface();
    };

    SelectorGadget.prototype.setOutputMode = function(e, output_mode) {
      var self;
      self = (e && e.data && e.data.self) || this;
      return self.output_mode = (e && e.data && e.data.mode) || output_mode;
    };

    SelectorGadget.prototype.rebind = function() {
      this.unbound = false;
      this.clearEverything();
      return this.setupBorders();
    };

    SelectorGadget.prototype.rebindAndMakeInterface = function() {
      this.makeInterface();
      return this.rebind();
    };

    SelectorGadget.prototype.randBetween = function(a, b) {
      return Math.floor(Math.random() * b) + a;
    };

    // SelectorGadget.toggle = function(options) {
	SelectorGadget.toggle = function(datai, envi) {
      if (!window.selector_gadget) {
        window.selector_gadget = new SelectorGadget();
        window.selector_gadget.makeInterface();
        window.selector_gadget.clearEverything();
        window.selector_gadget.setMode('interactive');
		    window.selector_gadget.datai = datai; // added by Xiong
        window.selector_gadget.envi = envi; // added by Xiong
        // pgbovine - don't do google analytics
        /*
        if ((options != null ? options.analytics : void 0) !== false) {
          window.selector_gadget.analytics();
        }
        */
      } else if (window.selector_gadget.unbound) {
        window.selector_gadget.datai = datai; // added by Xiong
        window.selector_gadget.envi = envi; // added by Xiong
        window.selector_gadget.rebindAndMakeInterface();
      } else {
        window.selector_gadget.unbindAndRemoveInterface();
      }
      return jQuerySG('.selector_gadget_loading').remove();
    };

    // pgbovine - don't use google analytics
    /*
    SelectorGadget.prototype.analytics = function() {
      var cookie, random, referer, today, urchinUrl, uservar, utmac, utmhn, utmn, utmp;
      utmac = 'UA-148948-9';
      utmhn = encodeURIComponent('www.selectorgadget.com');
      utmn = this.randBetween(1000000000, 9999999999);
      cookie = this.randBetween(10000000, 99999999);
      random = this.randBetween(1000000000, 2147483647);
      today = Math.round(new Date().getTime() / 1000.0);
      referer = encodeURIComponent(window.location.href);
      uservar = '-';
      utmp = 'sg';
      urchinUrl = 'http://www.google-analytics.com/__utm.gif?utmwv=1&utmn=' + utmn + '&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn=' + utmhn + '&utmr=' + referer + '&utmp=' + utmp + '&utmac=' + utmac + '&utmcc=__utma%3D' + cookie + '.' + random + '.' + today + '.' + today + '.' + today + '.2%3B%2B__utmb%3D' + cookie + '%3B%2B__utmc%3D' + cookie + '%3B%2B__utmz%3D' + cookie + '.' + today + '.2.2.utmccn%3D(direct)%7Cutmcsr%3D(direct)%7Cutmcmd%3D(none)%3B%2B__utmv%3D' + cookie + '.' + uservar + '%3B';
      return document.body.appendChild(jQuerySG('<img />').attr('src', urchinUrl).get(0));
    };
    */

    return SelectorGadget;

  })();

}).call(this);
