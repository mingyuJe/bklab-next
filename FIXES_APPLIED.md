# Fixes Applied

이번 수정본에서 처리한 항목입니다.

1. 누락 페이지 추가
   - `/research-data`
   - `/websites`

2. 데이터 구조 추가
   - `data/patents.json`
   - `data/gallery.json`
   - `data/research-data.json`
   - `data/websites.json`

3. Publications 구조 수정
   - 기존 root array 형태를 `{ "publications": [...] }` 형태로 변경
   - `lib/content.ts`에서 기존 array와 새 object 구조를 모두 읽을 수 있도록 방어 코드 추가

4. 이미지 폴더 수정
   - 잘못 생성된 `public/images/{members,facilities,news,gallery,hero}` 제거
   - 아래 폴더 개별 생성
     - `public/images/members`
     - `public/images/facilities`
     - `public/images/news`
     - `public/images/gallery`
     - `public/images/hero`
     - `public/images/uploads`

5. 방문자 화면 문구 정리
   - `/admin` 안내 문구 제거
   - `Migration needed`, `Add via /admin`, `Upload via /admin` 등 개발자용 문구 제거

6. Header 정리
   - 메뉴가 길어져서 `News / Gallery / Research Data / Websites`는 `More` 드롭다운으로 이동

7. 검증 확인
   - `npm run lint` 통과 확인
   - `npm run build` 통과 확인
