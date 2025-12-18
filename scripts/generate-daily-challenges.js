const fs = require('fs')
const path = require('path')

const dataDir = path.join(__dirname, '..', 'resources', 'js', 'components', 'data')
const outputDir = path.join(__dirname, '..', 'resources', 'js', 'components', 'date')

const roadmap = require(path.join(dataDir, 'roadmap.json'))
const lessonOverviews = require(path.join(dataDir, 'chapterLessonOverview.json'))

const lessonMap = lessonOverviews.reduce((map, lesson) => {
  if (lesson?.chapterId != null) {
    map[lesson.chapterId] = lesson
  }
  return map
}, {})

const toSentence = (text) => {
  if (!text) return ''
  const trimmed = text.trim()
  const firstSentence = trimmed.split('.').find(sentence => sentence.length > 0)
  return firstSentence || trimmed
}

const payload = {}

roadmap.forEach((chapter) => {
  if (chapter?.id == null) return
  const title = chapter.title || `Chapter ${chapter.id}`
  const lesson = lessonMap[chapter.id]
  const summary = toSentence(lesson?.summary)
  const highlight = toSentence(lesson?.overview?.[0]?.heading)

  payload[chapter.id] = [
    {
      id: 'insight-note',
      title: 'Capture today’s insight',
      description: summary
        ? `Note how “${title}” shaped your day: ${summary}.`
        : `Note what stuck with you from ${title}.`
    },
    {
      id: 'share-moment',
      title: 'Share the tone',
      description: highlight
        ? `Send someone why “${highlight}” matters in ${title}.`
        : `Send a short note about why ${title} matters.`
    },
    {
      id: 'routine-tie',
      title: 'Tie it to routine',
      description: `Pair ${title} with a daily cue (prayer, commute, or rest).`
    }
  ]
})

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

fs.writeFileSync(
  path.join(outputDir, 'dailyMicroChallenges.json'),
  JSON.stringify(payload, null, 2)
)

console.log('Generated dailyMicroChallenges.json with', Object.keys(payload).length, 'chapters')
