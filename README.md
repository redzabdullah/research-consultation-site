# Research consultations site: how to edit and publish it

This is a small website that works as a digital call card. It has no
build step and no database. It's just a few files that any browser can
open.

| File | What it's for | Edit it? |
|---|---|---|
| `content.js` | **All the words**: your details, the six themes, cases, steps, checklist | **Yes, this is the one** |
| `index.html` | Page layout and hero/closing text | Rarely |
| `styles.css` | Colours, fonts, spacing | Rarely |
| `script.js` | Makes filters, search and buttons work | No |
| `guide.html` + `guide.css` | The 10-step Data Discovery Guide page | For wording changes |
| `ai.html` + `ai.css` | The "AI & research data" page. `ai.css` loads after `styles.css` and `guide.css` and reuses their styles | For wording changes |
| `card.html` | Printable A6 call card with QR code | No (it reads `content.js`) |
| `assets/` | QR code, share preview image, icons, your photo | When your URL changes |
| `tools/make_images.py` | Rebuilds the QR code and share image | Run it, don't edit it |

---

## 1. Preview the site on your computer

Double-click `index.html`. It opens in your browser.

After each change, save the file in VS Code (**Ctrl+S**), then refresh
the browser (**F5**).

---

## 2. Edit a case (or any text)

1. In VS Code, open `content.js`.
2. Find the case. Press **Ctrl+F** and type, for example, `id: "03"`.
3. Change only the text **inside the double quotes**. For example:
   ```js
   takeaway: "Every vendor defines its universe differently. Understanding why saves you weeks of confusion."
   ```
4. Save and refresh the browser.

Rules that keep the file working:

- Keep every comma, `[ ]` and `{ }` where it is.
- **Inside the text, use curly quotes (“ ”) or apostrophes (’).** A
  straight `"` in the middle of the text ends the text early and breaks the
  page.
- To make words italic, wrap them in asterisks: `*like this*`.
- `did:` is a list of bullet points. Each bullet is a line in quotes,
  followed by a comma (no comma after the last one).
- A case's `stages` must use the same names as the `stages` list near the
  top of the file. That's how the Stage filter finds it.
- `tools` are the database chips shown in the expanded case. Search uses
  them too.

**If the page goes blank or the cases disappear**, a comma or quote is
probably missing. Press **Ctrl+Z** until it works again. In VS Code,
syntax mistakes are underlined in red.

### Add another case
There are nine cases: seven researcher journeys (01–07) and two from my
own practice (08–09). To add a tenth, copy a whole case block, from its
`{` to the matching `},`, paste it after the last case, and give it
`id: "10"`. To link it from a theme card, add `"10"` to that theme's
`cases: [...]` list. Also check the wording that counts cases: the
"7 doctoral journeys" stat in `content.js`, and in `index.html` the hero
sentence, the "Nine research journeys" heading, and the meta, OG and
Twitter descriptions.

### Optional case fields
Leave any of these out and the case simply doesn't show them.

- `quote:` the researcher's own words, shown as a quiet pull-quote under
  "The outcome". See case 07.
- `own: true,` marks a case from your own practice. The card gets a
  "My own build" badge and a light tint. See cases 08 and 09.
- `didLabel:` replaces the heading "What we did together", for example
  `didLabel: "What I built",`.
- `demo:` shows a box with this text and a "Book a demo" button (it uses
  your `bookingUrl`). It appears after the quote, if there is one.

The AI connectors and agents in cases 08 and 09 also have their own page,
`ai.html`. If you add a case about them, link it from there too.

### Add your photo
Save a square photo (about 300 × 300 pixels, **under 150 KB**) as
`assets/photo.jpg`. Then in `content.js` set `photo: "assets/photo.jpg",`.
For a free way to shrink a photo, use https://squoosh.app.

### Change your booking link or email
Edit `bookingUrl` or `email` in `content.js`. Every button updates
automatically.

---

## 3. Publish it (first time)

You'll need: Git (already installed on this computer), a free GitHub
account and a free Render account. **No credit card is needed.** On the
free plan, Render pauses the site if the monthly bandwidth runs out. It
never charges you.

### Step A: Create a GitHub account and an empty repository
1. Go to https://github.com and sign up (free).
2. Click the **+** at the top right, then **New repository**.
3. Repository name: `research-consultation-site`. Choose **Public**.
   Leave every other box unticked. Click **Create repository**.
4. Keep that browser tab open.

### Step B: Push the project from VS Code
1. In VS Code, click the **Source Control** icon in the left bar (it looks
   like a branching line, or press **Ctrl+Shift+G**).
2. Click **Initialize Repository**.
3. In the **Message** box, type `First version`, then click **Commit**.
   If VS Code asks whether to stage all changes, click **Yes** or **Always**.
   If Git asks for your name and email, run these in the terminal
   (**Ctrl+`**), then commit again:
   ```
   git config --global user.name "Redzuan Abdullah"
   git config --global user.email "you@example.com"
   ```
4. Click **Publish Branch**. VS Code will ask you to sign in to GitHub.
   Allow it in the browser.
5. Choose **Publish to GitHub public repository** with the name
   `research-consultation-site`. If you already made the empty repository
   in Step A and VS Code complains, run this instead in the terminal,
   replacing YOUR-USERNAME with your GitHub username:
   ```
   git remote add origin https://github.com/YOUR-USERNAME/research-consultation-site.git
   git push -u origin main
   ```
   (If it says `master` instead of `main`, use `master`.)
6. Refresh the GitHub page. You should see your files.

### Step C: Create the site on Render
1. Go to https://render.com and click **Get Started**. Sign up with your
   **GitHub** account (the easiest option).
2. Click **New +**, then **Static Site**.
3. Connect the `research-consultation-site` repository. If it isn't listed,
   click **Configure GitHub account** and give Render access to it.
4. Fill in:
   - **Name:** `redzuan-research-support` (this becomes your web address)
   - **Branch:** `main`
   - **Build Command:** *leave empty*
   - **Publish Directory:** `.` (a single full stop)
5. Click **Create Static Site**. Wait about a minute until it says **Live**.
6. Your address appears at the top, like `https://redzuan-research-support.onrender.com`.

### Step D: Point the QR code at your real address
The QR code and link previews currently point to
`https://redzuan-research-support.onrender.com`. **If Render gave you exactly that
address, skip this step.** Otherwise, open the VS Code terminal
(**Ctrl+`**) and run:

```
py -m pip install qrcode pillow
py tools/make_images.py https://YOUR-ACTUAL-ADDRESS.onrender.com
```

This updates the address in `content.js` and `index.html`, and creates a
new `assets/qr-code.png` and `assets/og-image.png`.

**No Python?** Update the address by hand instead:
1. Replace every `redzuan-research-support.onrender.com` in `index.html` and
   `content.js` with your address (**Ctrl+Shift+H** in VS Code does
   find-and-replace across files).
2. Make a QR code: open your live site in Microsoft Edge or Chrome,
   right-click the page, choose **Create QR code for this page**, download
   it, and save it as `assets/qr-code.png` (replacing the old one).

Then publish the change (see section 4). Scan the new QR code with your
phone to check it.

---

## 4. Publish a change (every time after that)

1. Save your edits.
2. **Source Control** panel → type a short message (e.g. `Update case 03`) → **Commit**.
3. Click **Sync Changes** (or **Push**).
4. Render notices the change and updates the live site within about a minute.

---

## 5. The call card

Open `card.html` (or `https://your-address.onrender.com/card.html`).
Press **Ctrl+P**, set paper size to **A6** (or print at "Actual size" on A4
and trim), and switch on **Background graphics**. For your last
orientation slide, take a screenshot of the card (**Windows+Shift+S**).

### QR code for slides
Two ready-made files sit in the `assets` folder. Each shows the QR code
with your web address printed underneath:

- `assets/qr-slide.png`: high resolution (1600 px wide). In PowerPoint,
  **Insert → Pictures → This Device**.
- `assets/qr-slide.svg`: stays sharp at any size, good for posters. Insert
  it the same way. PowerPoint 365 supports SVG.

For the QR code alone, without text, use `assets/qr-code.png`. All three
are remade automatically when you run `tools/make_images.py` with a new
address.

---

## 6. Things to keep in mind

- **Privacy:** before adding a case, remove names, initials,
  nationalities, exact dates, sample sizes, thesis titles and specific
  topics. Keep the footer note as it is.
- **Weight:** the page is about 290 KB. Keep any new images small, since the
  free plan has a monthly bandwidth limit.
- **No tracking:** the site uses no cookies, analytics or third-party
  scripts. Only the fonts load from Google Fonts.
- **Free plan:** if nobody visits for a while, a static site on Render stays
  online. (Only paid "web services" sleep. Static sites don't.)
