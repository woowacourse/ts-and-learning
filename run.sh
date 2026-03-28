
if [ -z "$1" ]; then
    echo "오류: 실행할 exercise 번호를 입력해주세요."
    exit 1
fi

EX_NO=$(printf "%02d" $1)

echo "실행: exercise-$EX_NO"
tsc "exercises/exercise-$EX_NO/index.ts" --noEmit