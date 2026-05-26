# BK Lab — 배포 가이드 (Vercel + GitHub + Decap CMS)

이 문서는 **처음부터 한 번** 따라가면 완성되는 셋업 가이드. 총 30~40분 소요.

---

## 📋 사전 준비

- [ ] GitHub 계정
- [ ] Vercel 계정 (GitHub 계정으로 가입 가능)
- [ ] Node.js 20+ 설치 (`node -v` 로 확인)
- [ ] Git 설치 (`git -v` 로 확인)

---

## Step 1 — 로컬에서 실행 확인 (5분)

```bash
# 프로젝트 폴더로 이동
cd bklab-next

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:3000 접속. Home 페이지가 잘 뜨면 OK.
(이 시점에는 `/admin`은 안 됨 — OAuth 설정이 안 됐기 때문)

---

## Step 2 — GitHub 저장소 만들기 (3분)

1. https://github.com/new 접속
2. Repository name: `bklab-next` (원하는 이름으로)
3. Public 선택 (Decap CMS는 무료 GitHub backend에서 public/private 둘 다 지원하지만, OAuth 셋업이 public이 살짝 쉬움)
4. README/license 등은 추가하지 말기 (이미 있는 프로젝트라서)
5. **Create repository**

그 다음, 로컬에서:

```bash
cd bklab-next
git init
git add .
git commit -m "Initial BK Lab site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bklab-next.git
git push -u origin main
```

---

## Step 3 — Vercel에 배포 (5분)

1. https://vercel.com/new 접속
2. **Import Git Repository** → 방금 만든 `bklab-next` 선택
3. Framework Preset: **Next.js** (자동 감지됨)
4. **Deploy** 클릭
5. 1~2분 기다리면 배포 완료
6. 배포된 URL 확인 (예: `bklab-next-abc123.vercel.app`)

이 URL을 잘 기억해두기 — 다음 단계에 필요함.

> **💡 커스텀 도메인 설정 (선택)**
> Vercel 프로젝트 → Settings → Domains → Add. 예: `bklab.kist.re.kr`
> KIST 측에 DNS 설정 요청 필요 (CNAME 추가).

---

## Step 4 — GitHub OAuth App 등록 (5분)

CMS에서 GitHub 로그인을 받기 위해 OAuth App을 만들어야 함.

1. https://github.com/settings/developers 접속
2. **OAuth Apps** 탭 → **New OAuth App**
3. 입력:
   - **Application name**: `BK Lab CMS` (아무 이름 OK)
   - **Homepage URL**: `https://YOUR-VERCEL-URL.vercel.app`
   - **Application description**: (선택)
   - **Authorization callback URL**: `https://YOUR-VERCEL-URL.vercel.app/api/callback`
4. **Register application**
5. 다음 화면에서 **Client ID** 복사 (예: `Iv1.abc123...`)
6. **Generate a new client secret** 클릭 → **Client Secret** 복사 (한 번만 보임! 어딘가에 저장)

---

## Step 5 — Vercel 환경 변수 등록 (3분)

1. Vercel 프로젝트 페이지 → **Settings** → **Environment Variables**
2. 다음 두 개 추가:

| Key | Value | Environment |
|-----|-------|-------------|
| `GITHUB_CLIENT_ID` | (4번에서 복사한 Client ID) | Production, Preview, Development |
| `GITHUB_CLIENT_SECRET` | (4번에서 복사한 Client Secret) | Production, Preview, Development |

3. **Save**
4. **Deployments** 탭 → 최신 배포의 ⋯ 메뉴 → **Redeploy** (환경 변수 반영)

---

## Step 6 — CMS 설정 파일 수정 (2분)

`public/admin/config.yml` 파일을 열어서:

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/bklab-next        # ⭐ 본인 GitHub 사용자명/저장소명
  branch: main
  base_url: https://YOUR-VERCEL-URL.vercel.app    # ⭐ Vercel URL
  auth_endpoint: api/auth
```

수정 후 git push:

```bash
git add public/admin/config.yml
git commit -m "Configure CMS backend"
git push
```

Vercel이 자동으로 재배포함 (~1분).

---

## Step 7 — CMS 동작 확인 (3분)

1. `https://YOUR-VERCEL-URL.vercel.app/admin` 접속
2. **Login with GitHub** 버튼 클릭
3. GitHub 인증 화면 → **Authorize**
4. CMS 메인 화면이 뜨면 성공! 🎉

시도해보기:
- News → Add new → 더미 글 작성 → Publish
- ~1분 후 메인 사이트 `/news` 페이지에서 글이 보임

---

## Step 8 — Collaborator 추가 (PI/후임 인수인계)

다른 사람도 CMS 편집 가능하게 하려면:

1. GitHub 저장소 페이지 → **Settings** → **Collaborators**
2. **Add people** → 상대 GitHub 사용자명/이메일 입력
3. 상대가 초대 수락하면 끝
4. 이제 상대도 `/admin`에서 GitHub 로그인해서 편집 가능

---

## 🔧 자주 발생하는 문제

### "Login with GitHub" 눌렀는데 404 페이지
→ Step 5 환경 변수가 안 들어갔거나 Redeploy 안 함. 다시 확인.

### "GITHUB_CLIENT_ID not configured" 에러
→ 같은 이유. Vercel 환경 변수 추가 후 Redeploy 필요.

### "Bad credentials" or "Unauthorized"
→ Step 4의 callback URL이 정확히 `/api/callback` 으로 끝나야 함.
→ Client Secret 복사 실수일 가능성도. 재생성 후 다시 등록.

### CMS는 떴는데 콘텐츠가 안 보임
→ `config.yml`의 `repo`가 본인 저장소와 정확히 일치하는지 확인.

### 어드민에서 저장 눌렀는데 사이트 반영이 안 됨
→ Vercel **Deployments** 탭에서 빌드 로그 확인.
→ 새 commit이 들어오면 자동 빌드되는지 봐야 함.

---

## 📊 (참고) 191편 Publications 한꺼번에 임포트

1편씩 어드민 폼으로 넣기엔 너무 많음. 다음 방법 추천:

1. Google Scholar 또는 기존 Google Sites에서 191편 정보를 엑셀/구글시트로 정리:
   ```
   id, year, title, authors, venue, details, doi, pi, featured
   191, 2024, "Extreme sputtering: ...", "Jung, SY; ...", "Journal of Advanced Ceramics", "Vol. 13 · p. 1919", "", "Baek", true
   ...
   ```
2. 엑셀을 JSON으로 변환 (예: https://csvjson.com/csv2json)
3. 결과를 `data/publications.json`에 붙여넣기
4. git push → 자동 배포
5. 이후 추가 논문은 `/admin`에서 1편씩

저자 강조는 `**Baek, SH**` 처럼 별표 두 개로 감싸면 사이트에서 강조됨.

---

## 📞 도움이 필요할 때

- Decap CMS 공식 문서: https://decapcms.org/docs/
- Vercel 공식 문서: https://vercel.com/docs
- Next.js 공식 문서: https://nextjs.org/docs

콘텐츠 모델 (어떤 필드가 있는지)을 바꾸고 싶으면 `public/admin/config.yml` 직접 수정.

---

## ✅ 셋업 완료 체크리스트

- [ ] 로컬 dev 서버 동작 (`npm run dev`)
- [ ] GitHub 저장소에 push 완료
- [ ] Vercel에 자동 배포 작동
- [ ] OAuth App 등록 + Client ID/Secret 확보
- [ ] Vercel 환경 변수 등록
- [ ] `config.yml`의 repo/base_url 수정
- [ ] `/admin` 로그인 성공
- [ ] News에서 더미 글 작성 → 사이트 반영 확인
- [ ] Collaborator로 후임/PI 추가 (선택)
