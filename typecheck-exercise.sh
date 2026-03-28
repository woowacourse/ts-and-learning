#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: npm run ex <number>"
  echo "Example: npm run ex 01"
  exit 1
fi

EXERCISE_NUM=$(printf "%02d" "$1")
EXERCISE_DIR="exercises/exercise-${EXERCISE_NUM}"

if [ ! -d "$EXERCISE_DIR" ]; then
  echo "exercise-${EXERCISE_NUM} not found"
  exit 1
fi

TEMP_CONFIG=".tsconfig.exercise.tmp.json"

cat > "$TEMP_CONFIG" << EOF
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react",
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "type-assertions": ["src/lib/type-assertions/index.ts"]
    }
  },
  "include": [
    "${EXERCISE_DIR}/**/*.ts"
  ]
}
EOF

npx tsc --noEmit -p "$TEMP_CONFIG"
EXIT_CODE=$?

rm -f "$TEMP_CONFIG"

if [ $EXIT_CODE -eq 0 ]; then
  echo "exercise-${EXERCISE_NUM} PASS"
else
  echo "exercise-${EXERCISE_NUM} FAIL"
fi

exit $EXIT_CODE
