const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.{ts,tsx}');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes('useProgressStore')) {
    if (!content.includes('useProfileStore')) {
      content = "import { useProfileStore } from '../stores/profileStore';\n" + content;
    }
    content = content.replace(/const { progress(.*?) } = useProgressStore\(\);/g, "const activeId = useProfileStore(s => s.activeProfileId);\n  const progress = useProgressStore(s => s.data[activeId] || s.data['default']);\n  const {$1 } = useProgressStore();");
    changed = true;
  }

  if (content.includes('useVocabStore')) {
    if (!content.includes('useProfileStore') && !content.includes('profileStore')) {
      content = "import { useProfileStore } from '../stores/profileStore';\n" + content;
    }
    content = content.replace(/const { words(.*?) } = useVocabStore\(\);/g, "const vocabActiveId = useProfileStore(s => s.activeProfileId);\n  const words = useVocabStore(s => s.data[vocabActiveId]?.words || []);\n  const {$1 } = useVocabStore();");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
  }
});
