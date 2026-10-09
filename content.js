/* =====================================================================
   CONTENT FILE: all the words on the site live here.
   ---------------------------------------------------------------------
   HOW TO EDIT
   - Change only the text between the "double quotes".
   - Keep the commas, brackets [ ] and braces { } exactly as they are.
   - To make a word italic, wrap it in asterisks: *like this*.
   - If your text needs a double quote inside it, use curly quotes
     (“ ”) instead of straight ones, or the file will break.
   - Save the file, then refresh the browser to check your change.
   - If the page goes blank, you've probably deleted a comma or a quote.
     Undo (Ctrl+Z) until it works again.

   Your booking link and email below are applied to every button on
   the site automatically, and to the printable call card (card.html).
   ===================================================================== */

window.SITE_CONTENT = {

  /* ---------- About you ---------- */
  person: {
    name: "Redzuan Abdullah",
    title: "Senior Librarian, Research & Data",
    titleInSentence: "Senior Librarian for Research & Data", // used in the hero sentence
    institution: "SMU Libraries, Singapore Management University",
    expertise: "Business & financial databases, research data and systematic searching.",
    bookingUrl: "https://researchguides.smu.edu.sg/prf.php?id=c960a95b-7bd7-11ed-9738-0ae0bf56cf20",
    email: "redzuana@smu.edu.sg",
    // Leave empty "" to show your initials. To use a photo, put it in the
    // assets folder and write its name, e.g. "assets/photo.jpg"
    photo: "",
    initials: "RA",
    // One line for the printable call card
    pitch: "One-to-one research support for postgraduate researchers, from the first “does this data even exist?” to the final submission.",
    // Your live website address. Update this after you deploy (see README).
    siteUrl: "https://redzuan-research-support.onrender.com"
  },

  /* ---------- Stats strip (4 short facts) ---------- */
  stats: [
    { value: "7", label: "doctoral journeys featured" },
    { value: "3+ years", label: "of continuous researcher support" },
    { value: "15+", label: "databases and research platforms" },
    { value: "Proposal → submission", label: "support at every stage" }
  ],

  /* ---------- Stage filters (used on case cards) ---------- */
  stages: [
    "Finding data",
    "Linking & cleaning",
    "Research design",
    "Code & workflows",
    "Literature search",
    "Writing & completion"
  ],

  /* ---------- Where I can help (6 themes) ---------- */
  themes: [
    {
      title: "Finding the right data",
      description: "“Does the data exist, where is it, and which source fits my question?” I’ll help you scope feasibility early and choose the best source for each variable.",
      chips: ["WRDS", "CRSP", "Compustat", "BoardEx", "SDC M&A", "Bloomberg", "S&P Capital IQ", "Refinitiv (LSEG)", "Datastream", "FactSet", "USPTO"],
      cases: ["01", "02", "03", "04", "05", "07", "09"]
    },
    {
      title: "Linking and cleaning across databases",
      description: "Different vendors, different identifiers, different “universes”. I help you merge sources reliably and explain why the numbers don’t match.",
      chips: ["CUSIP", "PCUSIP", "CIK", "ISIN", "Ticker histories", "Coverage checks"],
      cases: ["01", "03", "04", "07"]
    },
    {
      title: "Turning concepts into variables",
      description: "Translating the constructs in your proposal into measurable variables, and rebuilding measures when a platform changes underneath you.",
      chips: ["Operationalisation", "ESG disclosure", "Corporate events", "Diversification measures", "Instrumental variables"],
      cases: ["01", "02", "05", "07"]
    },
    {
      title: "Code-assisted research workflows",
      description: "Moving from manual downloads to repeatable, reproducible extraction and cleaning.",
      chips: ["SQL", "Python", "WRDS JupyterHub", "Bloomberg Spreadsheet Builder", "Stata"],
      cases: ["01", "02", "04", "05"]
    },
    {
      title: "Literature searching and evidence synthesis",
      description: "Search strategies for systematic reviews and meta-analyses, plus responsible use of AI discovery tools.",
      chips: ["Subject headings", "Citation chaining", "ResearchRabbit", "Litmaps", "Scopus", "PRISMA", "AI-assisted discovery"],
      cases: ["03", "06"]
    },
    {
      title: "AI, APIs and research agents",
      description: "Pulling data through APIs and Python, and using AI connectors (MCP) to build your own research agents, with the guardrails that keep every number traceable.",
      chips: ["Python", "APIs", "MCP", "OpenAlex", "arXiv", "SEC EDGAR", "AI agents", "Source audits"],
      cases: ["03", "05", "06", "07", "08", "09"]
    }
  ],

  /* ---------- Nine research journeys ----------
     own       : optional; true marks a case from my own practice
     didLabel  : optional; replaces the heading “What we did together”
     demo      : optional; shows a “Book a demo” box with this text
     id        : the case number shown on the card ("01", "02"…)
     stages    : must match names in the "stages" list above
     tools     : database/tool names shown as chips (also searchable)
     did       : one line per bullet point
     journey   : the steps of the small timeline
     quote     : optional; a short quote from the researcher, shown as
                 a pull-quote. Leave the line out if there isn’t one.  */
  cases: [
    {
      id: "01",
      title: "Building a long-run firm panel and a credible causal design",
      role: "PhD candidate",
      field: "Finance & corporate governance",
      duration: "~18 months",
      stages: ["Finding data", "Linking & cleaning", "Research design", "Code & workflows"],
      tools: ["WRDS", "CRSP", "Compustat", "BoardEx", "CIK", "ISIN", "Python"],
      challenge: "The project needed every U.S.-listed firm over many years, linked to board and executive histories, plus a credible way to show cause and effect rather than just correlation. Along the way, stock splits were showing up as genuine price movements across thousands of daily observations.",
      did: [
        "Built the firm universe from CRSP/Compustat on WRDS, with annual firm counts to anchor the sample.",
        "Designed a step-by-step linking path from firm identifiers (CIK, ISIN) through BoardEx company and director profiles.",
        "Located rarely used BoardEx fields to flag specific leadership events that could support an instrumental-variable strategy.",
        "Reconciled coverage gaps between BoardEx and a second governance database, and agreed on clear sample-exclusion rules.",
        "Used CRSP’s cumulative price adjustment factor to separate corporate actions from genuine returns, and suggested automating the cleaning in Python.",
        "Traced hard-to-find firms through ticker changes and corporate successors."
      ],
      outcome: "The researcher moved from *“where do I even get this data?”* to a validated, multi-source dataset and a defensible identification strategy, and came back at every new stage.",
      journey: ["Dataset discovery", "Acquisition & validation", "Data engineering", "Causal design"],
      takeaway: "Your identifiers are your foundation. Get the linking right early and every later step gets easier."
    },
    {
      id: "02",
      title: "From a broad idea to a measurable industry dataset",
      role: "DBA candidate",
      field: "Strategy & sustainability in a global industry",
      duration: "~2.5 years",
      stages: ["Finding data", "Research design", "Code & workflows"],
      tools: ["S&P Capital IQ", "Bloomberg", "Bloomberg Spreadsheet Builder", "WRDS"],
      challenge: "A practitioner-researcher had a strong industry question. But there was no ready-made list of firms, no clear source for several key variables, and historical credit ratings were painful to extract.",
      did: [
        "Screened a global firm universe in S&P Capital IQ to define the dissertation sample.",
        "Matched each construct in the proposal to a concrete, available variable and source.",
        "Demonstrated Bloomberg Spreadsheet Builder to pull ESG disclosure scores into a panel, then shared guides so the researcher could extract the data independently.",
        "When Bloomberg proved slow for historical ratings, recommended the cleaner WRDS Capital IQ ratings dataset.",
        "Maintained a shared project folder of datasets, methodology notes and variable definitions."
      ],
      outcome: "A clearly defined sample, a variable-by-variable data plan, and the confidence to extract the data without relying on anyone else.",
      journey: ["Concept", "Sample construction", "Variable sourcing", "Operationalisation", "Ratings data"],
      takeaway: "Before collecting anything, map every variable in your proposal to a source. That way the gaps show up in month one, not year three."
    },
    {
      id: "03",
      title: "Navigating a maze of databases and keeping the downloads running",
      role: "PhD candidate",
      field: "Sustainable finance",
      duration: "~18 months",
      stages: ["Finding data", "Linking & cleaning", "Literature search", "Writing & completion"],
      tools: ["Refinitiv (LSEG)", "Bloomberg", "FactSet", "Datastream", "WRDS", "CUSIP", "GICS", "Stata"],
      challenge: "An exploratory project touched on M&A, supply chains and ESG. It spanned Refinitiv, Bloomberg, FactSet, Datastream and WRDS, each with its own coverage, identifiers and export limits. It also needed long, heavy downloads on specialist terminals.",
      did: [
        "Started with research-discovery tools: suggested an alternative AI literature tool when institutional access to one wasn’t available, and pointed to Stata training.",
        "Ran hands-on sessions in the Investment Studio on Bloomberg, FactSet and Refinitiv.",
        "Introduced Datastream ESG content, sustainability-bond searches and database-linking tables.",
        "Explained why “the universe” differs between vendors, and how to handle CUSIP matching, GICS classifications and export caps.",
        "Kept long extractions going by extending terminal bookings, reserving workstations, and escalating access and download issues until they were resolved."
      ],
      outcome: "The researcher progressed from exploring topics to large-scale data extraction, with the access and know-how to keep the project moving.",
      journey: ["Research skills", "Topic exploration", "Data linking & methodology", "Large-scale extraction"],
      takeaway: "Every vendor defines its universe differently. Understanding why saves you weeks of confusion."
    },
    {
      id: "04",
      title: "Supporting a dissertation from feasibility to final submission",
      role: "DBA candidate",
      field: "M&A and innovation in a science-intensive industry",
      duration: "~2 years",
      stages: ["Finding data", "Linking & cleaning", "Research design", "Code & workflows", "Writing & completion"],
      tools: ["SDC M&A", "WRDS", "USPTO", "PCUSIP", "Stata", "APA 7"],
      challenge: "The research question needed decades of acquisition, alliance and patent data. Midway through, the main deal database moved to a new platform, and the earlier extraction steps no longer worked.",
      did: [
        "Assessed feasibility up front: did acquisition, alliance and patent data exist at the scale required?",
        "Advised on USPTO patent classifications to separate distinct technology domains, and on collecting patents at scale.",
        "Rebuilt the acquisition and alliance samples after SDC moved into WRDS, and shared working files.",
        "Resolved PCUSIP-to-company-name issues by comparing sources and escalating to WRDS support.",
        "Consulted on Stata for testing a non-linear (U-shaped) relationship ahead of the defence.",
        "Reviewed the final dissertation for APA 7 citations and for table, figure and appendix formatting."
      ],
      outcome: "The dissertation was completed and submitted, and the library support was acknowledged in its pages.",
      journey: ["Feasibility", "Data acquisition & validation", "Analysis", "Defence & submission"],
      takeaway: "Research support doesn’t stop at data. Bring your final draft, too."
    },
    {
      id: "05",
      title: "When the dataset disappeared, we rebuilt the measure",
      role: "Doctoral researcher",
      field: "Mergers & acquisitions",
      duration: "About one week",
      stages: ["Finding data", "Research design", "Code & workflows"],
      tools: ["SDC M&A", "WRDS", "WRDS JupyterHub", "SQL", "Python"],
      challenge: "The researcher wanted to replicate a diversification measure used in published M&A studies. The measure relied on multiple industry codes per firm from the now-retired SDC Platinum desktop. The current WRDS version records only one primary industry code per deal, so replication looked impossible.",
      did: [
        "Confirmed what was, and wasn’t, still licensed and retained.",
        "Explored the WRDS SDC M&A fields directly, testing on two well-known listed firms.",
        "Proposed a reconstruction: aggregate each firm’s deal history across the study window, then count distinct 4-digit SIC codes as a diversification proxy.",
        "Built a working proof of concept in SQL and Python on WRDS JupyterHub."
      ],
      outcome: "Within a week, the researcher confirmed the method fit the study and would adopt it, so the replication went ahead.",
      journey: ["Access enquiry", "Feasibility check", "Method redesign", "Code prototype", "Validated"],
      takeaway: "A missing field isn’t always a dead end. Often the measure can be rebuilt from what remains."
    },
    {
      id: "06",
      title: "Designing a search strategy for a meta-analysis",
      role: "PhD student",
      field: "Organisational behaviour & HR",
      duration: "Focused consultation",
      stages: ["Literature search"],
      tools: ["Scopus", "Google Scholar", "ResearchRabbit", "Litmaps", "CitationChaser", "PRISMA"],
      challenge: "A meta-analysis lives or dies by its search. The researcher had a starting keyword string, and wanted to know whether it was comprehensive enough and how AI tools could help responsibly.",
      did: [
        "Reviewed the initial search string and the seed papers, extracting author keywords and methods from each.",
        "Mapped new concept clusters and discipline-specific terms the original search had missed.",
        "Demonstrated database thesauri and subject headings to improve both precision and recall.",
        "Showed citation-network tools (ResearchRabbit, Litmaps, CitationChaser) alongside Scopus and Google Scholar.",
        "Discussed AI-assisted searching with human verification, documented in a PRISMA-ready way.",
        "Collated everything into a literature-mapping document shared after the session."
      ],
      outcome: "A broader, better-documented search strategy, and a reusable toolkit for the systematic stages ahead.",
      journey: ["Request", "Strategy review", "Literature mapping", "Consultation", "Follow-up toolkit"],
      takeaway: "Keywords alone miss things. Combine subject headings, author terms and citation chaining."
    },
    {
      id: "07",
      title: "Mapping governance theory onto real database variables",
      role: "DBA candidate",
      field: "Corporate governance in an Asian market",
      duration: "Early-stage data consultation",
      stages: ["Finding data", "Linking & cleaning", "Research design", "Writing & completion"],
      tools: ["LSEG Workspace", "LSEG ESG", "Bloomberg", "WRDS", "AI-assisted documentation review"],
      challenge: "The study compared listed firms before and after a national governance reform, using a framework that separates governance “form” (the structures a firm has in place) from governance “substance” (how well those structures work in practice). The question was whether licensed commercial databases could measure both, and which source to trust for what.",
      did: [
        "Reviewed LSEG Workspace’s ESG and governance content in depth, using AI-assisted analysis of the vendor documentation, and built a custom spreadsheet of relevant variables.",
        "Sorted the variables into the researcher’s own framework. “Form” covered measures such as board size, board independence, CEO–chair separation and committee existence. “Substance” covered measures such as audit committee expertise, pay linked to performance, board evaluations and auditor tenure.",
        "Advised that structures can often be read straight from disclosures, while governance quality usually needs carefully chosen proxies or composite measures.",
        "Compared LSEG, Bloomberg and WRDS, showing where each is strongest. For example, Bloomberg is strong for institutional and insider ownership and executive pay. We identified specific Bloomberg fields to extract at scale.",
        "Planned how governance, ownership, financial and firm-level data could be linked into a longitudinal panel, including identifier matching and coverage gaps for the market studied.",
        "Removed practical blockers: Mac access and Workspace Lite set-up, download and licensing limits, and arranging an extension of database access with library colleagues."
      ],
      outcome: "The researcher left with a variable map that matched their theoretical model, a clear multi-database plan, and continued access to keep exploring. They kept coming back for advice on database choices as the thesis developed.",
      // Optional: a short quote from the researcher. Leave it out if there isn't one.
      quote: "It is very useful in further thinking and understanding potential form and substance variables.",
      journey: ["Feasibility check", "Variable mapping", "Measurement strategy", "Multi-database plan", "Panel design"],
      takeaway: "Start from your theory, not the database. Sort the variables into your own framework and the gaps in your data become obvious."
    },
    {
      id: "08",
      own: true,
      title: "When discovery meant building my own research agent",
      role: "From my own practice",
      field: "Open financial data & literature discovery",
      duration: "Self-initiated build",
      stages: ["Finding data", "Code & workflows", "Literature search"],
      tools: ["Python", "APIs", "MCP", "Yahoo Finance", "Alpha Vantage", "OpenAlex", "arXiv", "DOAJ", "SEC EDGAR"],
      challenge: "Before choosing a licensed database, I often need a fast first look: a few companies’ prices and accounts from open financial sources, plus what academic research already says about the topic. Doing that by hand meant hopping between websites, copying numbers into spreadsheets and running separate literature searches, with no record of where each figure came from.",
      didLabel: "What I built",
      did: [
        "An AI connector built on the Model Context Protocol (MCP), so a plain-language question is routed to a specific data operation instead of a generic web search.",
        "Two open financial-data sources, Yahoo Finance and Alpha Vantage, covering prices, company accounts, ownership snapshots, corporate actions and macro indicators.",
        "Literature discovery in the same workflow: OpenAlex for published research, arXiv for preprints (always labelled as preprints), and DOAJ to check whether a journal is listed.",
        "A source audit on every answer: provider, retrieval date, rows returned, row limits and missing fields, with calculated values kept apart from reported ones.",
        "A confirmation gate. When a field isn’t available, such as executive pay, the agent names the gap, proposes the narrowest authoritative source (SEC filings) and waits for approval before using it.",
        "Deliberate stress tests: invalid tickers, truncated price histories, missing values that must stay missing rather than become zero, and preprints that must never pass as peer-reviewed."
      ],
      outcome: "A fast, documented scoping layer. In minutes I can compare companies, pull recent accounts and see the relevant literature side by side, then decide which licensed database the real study needs. It doesn’t replace WRDS, Bloomberg, LSEG, Capital IQ or Scopus; it tells me which one to open.",
      demo: "The open APIs behind it have tight daily limits, so it isn’t open for public use. Book a session and I’ll demo it live, or help you plan an agent of your own.",
      journey: ["Repetitive scoping work", "Agent design", "Open data + literature", "Source audit & limits", "Tested & demoed"],
      takeaway: "Sometimes discovery means building your own tool. Let AI do the fetching, but make it show its evidence."
    },
    {
      id: "09",
      own: true,
      title: "From one faculty data request to an AI search assistant for ICPSR",
      role: "Faculty request, then my own build",
      field: "Workplace behaviour · Social science data discovery",
      duration: "Two-day enquiry, then a build",
      stages: ["Finding data", "Research design", "Code & workflows"],
      tools: ["ICPSR", "Harvard Dataverse", "ICPSR API", "MCP", "AI agents", "Python"],
      challenge: "A faculty researcher needed survey data capturing moments when employees reveal personal circumstances at work, such as taking leave to care for a family member, and it had to sit alongside each employee’s position in the hierarchy. Social science archives hold thousands of studies, but variables like these are buried inside questionnaires, not in study titles.",
      didLabel: "What I did, and then built",
      did: [
        "Turned the request into two must-have criteria: a variable showing an employee disclosing a personal circumstance, and a measure of seniority such as grade level or supervisory status.",
        "Scanned the major social-science repositories, Harvard Dataverse and ICPSR, then searched ICPSR at question level for terms such as “sick leave” and “annual leave”.",
        "Found a large public-sector employee survey whose questions on using leave for adult dependent care sat alongside grade level and supervisory status, meeting both criteria in one dataset. I also flagged its limitation: an older workforce context.",
        "Realised that this kind of search doesn’t scale by hand. Every new concept meant another round of keyword trial and error across thousands of study records.",
        "So I built *ICPSR Data Search*: an AI assistant that turns a plain-language request into structured searches of ICPSR study metadata (topic, geography, investigator, funder, archive and release dates) through ICPSR’s own API.",
        "Kept retrieval and interpretation apart. Every answer lists the search parameters, retrieval date, result count, study numbers and links, labels relevance notes as the assistant’s judgement, and warns that finding a study isn’t proof it contains the variables you need."
      ],
      outcome: "The researcher confirmed the dataset was exactly the kind of data they were after and asked for more like it. That request is why the assistant exists: it now produces a defensible shortlist of candidate studies in minutes, while the final check still happens where it should, in ICPSR’s codebooks and documentation.",
      quote: "Thank you for this information. That’s very helpful. We are looking for data along these lines.",
      demo: "Like Case 08, it isn’t open for public use. Book a session and I’ll run it live on your topic, then we’ll check the shortlist in ICPSR’s documentation together.",
      journey: ["Faculty data request", "Repository scan", "Question-level search", "Dataset found", "Assistant built"],
      takeaway: "When the same search keeps coming back, turn it into a tool. But a shortlist is only a start: the codebook has the final word."
    }
  ],

  /* ---------- How a consultation works (4 steps) ---------- */
  steps: [
    { title: "Book a slot.", text: "Tell me your topic, your stage, and what’s blocking you." },
    { title: "We meet,", text: "online or in person. We look at your actual question, data or search together." },
    { title: "You leave with something concrete:", text: "a data plan, a search strategy, notes or a working script, often in a shared folder." },
    { title: "Come back anytime.", text: "Most researchers featured here returned at each new stage of their project." }
  ],

  /* ---------- Before we meet (checklist) ---------- */
  checklist: [
    "Your research question or a short proposal summary",
    "The variables or concepts you need to measure",
    "Databases or searches you’ve already tried",
    "Your next deadline (proposal defence, data collection, submission)"
  ]
};
