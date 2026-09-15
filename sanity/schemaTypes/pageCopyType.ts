import { defineField, defineType } from 'sanity';
import { FileText } from 'lucide-react';
import defaults from '../data/page-copy.json';

export const pageCopyType = defineType({
  name: 'pageCopy', title: 'Page headings & copy', type: 'document', icon: FileText,
  groups: Object.keys(defaults).map((name,index) => ({name,title:name.replace(/([A-Z])/g,' $1').trim(),default:index===0})),
  fields: Object.entries(defaults).map(([name,values]) => defineField({
    name, title: name.replace(/([A-Z])/g,' $1').trim(), group: name, type: 'object',
    fields: Object.entries(values).map(([key,text]) => defineField({
      name:key, title:text.trim().slice(0,85), description:'Original: '+text,
      type:text.length>100?'text':'string',
    })),
  })),
  preview: {prepare:()=>({title:'Page headings & copy'})},
});
