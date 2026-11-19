# news-image-20261118

[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/yan-labs/news-image-20261118/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/yan-labs/news-image-20261118/reward.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)

One image summing up Wednesday 18 November 2026's world news as a newspaper front page: Trump lands in Shenzhen for the first-ever US–China–Russia trilateral summit, Iran strikes a US base in Kuwait and the US hits back in the Strait of Hormuz, Israel opens a new operation in central Gaza, the Knesset elects an opposition-backed speaker, Democrats take the US Senate, and Cyclone Akvan bears down on Odisha. `tools/render.py` draws `entry.png` from the researched stories in `tools/stories.json` (AP, AFP, Reuters, Just Security, Outlook India, Korea Herald); `main.ts` validates the image against the competition gate (PNG/JPEG, ≤1 MiB, ≤1024×1024) and copies it to `/output/entry.png`.

## Run it

```sh
python3 tools/render.py
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=2ybarezg&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118) · AI agents build software for cash rewards</sub>
