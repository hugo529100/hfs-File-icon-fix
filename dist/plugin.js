exports.version = 1.1
exports.apiRequired = 8.7
exports.repo = "Hug3O/File-icon-fix"
exports.description = "Auto-assign icons for video, audio, image, and script/text files based on their extensions, with customizable extension lists."

exports.config = {
  extraVideoExt: {
    type: 'string',
    label: 'Additional video extensions',
    helperText: 'Comma-separated list, e.g. webm,rmvb,mts',
    defaultValue: 'mp4, avi, mkv, webm, mov, wmv, flv, ts, mpeg, mpg, m4v, 3gp, 3g2, rm, rmvb, rm, dat, mts, m2ts, asf, vob',
  },
  extraAudioExt: {
    type: 'string',
    label: 'Additional audio extensions',
    helperText: 'Comma-separated list, e.g. alac,dts,ac3',
    defaultValue: 'mp3, flac, wav, ogg, aac, m4a, alac, ape, wma, dts, ac3, opus, aiff, aif, dsd, dsf, dff, au, ra',
  },
  extraImageExt: {
    type: 'string',
    label: 'Additional image extensions',
    helperText: 'Comma-separated list, e.g. heic,avif,jxl',
    defaultValue: 'jpg, jpeg, png, gif, bmp, webp, svg, ico, tif, tiff, heic, heif, avif, jxl, apng, jp2, j2k, jpf, jpx, jpm, mj2, psd, raw, cr2, cr3, nef, arw, dng, orf, rw2, raf, pef, srw',
  },
  extraTextExt: {
    type: 'string',
    label: 'Additional text/script extensions',
    helperText: 'Comma-separated list, e.g. log,ini,vue,ts',
    defaultValue: 'txt, md, html, htm, js, css, json, yaml, yml, xml, py, sh, bat, ini, cfg, log, ts, vue, c, cpp, java, php, rb, rs, go, toml',
  },
}

const defaultAudio = ['mp3','flac','wav','ogg','aac','m4a','alac','ape','wma','dts','ac3','opus','aiff','au','ra']
const defaultVideo = ['mp4','avi','mkv','webm','mov','wmv','flv','ts','mpeg','mpg','m4v','3gp','3g2','rm','rmvb','mts','m2ts','asf','vob']
const defaultImage = ['jpg','jpeg','png','gif','bmp','webp','svg','ico','tif','tiff','heic','heif','avif','jxl','apng','jp2','j2k','jpf','jpx','jpm','mj2','psd','raw','cr2','cr3','nef','arw','dng','orf','rw2','raf','pef','srw']
const defaultText = ['txt','md','html','htm','js','css','json','yaml','yml','xml','py','sh','bat','ini','cfg','log','ts','vue','c','cpp','java','php','rb','rs','go','toml']

exports.init = api => ({
  onDirEntry({ entry }) {
    const ext = entry.n.split('.').pop().toLowerCase()
    const toArray = str => str?.split(/[,\s]+/).map(s => s.trim().toLowerCase()).filter(Boolean) || []

    const userAudio = toArray(api.getConfig('extraAudioExt'))
    const userVideo = toArray(api.getConfig('extraVideoExt'))
    const userImage = toArray(api.getConfig('extraImageExt'))
    const userText  = toArray(api.getConfig('extraTextExt'))

    if ([...defaultImage, ...userImage].includes(ext)) {
      entry.icon = 'image'
    } else if ([...defaultAudio, ...userAudio].includes(ext)) {
      entry.icon = 'audio'
    } else if ([...defaultVideo, ...userVideo].includes(ext)) {
      entry.icon = 'video'
    } else if ([...defaultText, ...userText].includes(ext)) {
      entry.icon = 'file'
    }
  }
})