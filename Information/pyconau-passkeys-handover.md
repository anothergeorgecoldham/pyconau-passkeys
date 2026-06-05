# pyconau-passkeys — 11ty Companion Site Handover

## Project purpose

Build a GitHub Pages companion site for George Coldham's PyCon AU talk: **Passkeys: Authentication Without Shared Secrets**.

The site should feel like a polished conference companion and visual essay. It should preserve the high-impact modern Art Nouveau aesthetic of the slide deck, while making the talk accessible as a web-native reference: slide image, intention, speaker track, highlighted notes, and authoritative additional reading per slide.

## Public author identity

**George Coldham**  
Microsoft Cloud Solution Architect

Use this attribution in the footer and about section. Keep the content vendor-neutral in tone. Microsoft references are acceptable where relevant as one source among standards, government guidance, and industry documentation.

## Recommended information architecture

Use **11ty** hosted on **GitHub Pages**.

Recommended routes:

- `/` — landing page with hero, talk thesis, deck navigation, and call-to-action to start the visual essay.
- `/slides/01-passkeys-authentication-without-shared-secrets/` through `/slides/11-fewer-passwords/` — one page per slide.
- `/slides/12-resources/` — future-proof route for QR/resources slide once the public URL exists.
- `/resources/` — consolidated additional reading grouped by standards, government guidance, developer implementation, and enterprise deployment.
- `/notes/` — optional index of highlighted notes across the talk.
- `/about/` — speaker bio and talk context.

The site can also support a guided mode where each slide page has **Previous / Next** navigation and soft page transitions.

## SSG recommendation

Use **Eleventy / 11ty** because:

- It is simple, static, and GitHub Pages friendly.
- The content can be data-driven from `src/_data/talk.yaml`.
- It can generate one page per slide from structured data.
- It avoids unnecessary client-side framework weight.
- It gives the coding agent a small surface area to keep beautiful.

Use GitHub Actions for deployment, following the official 11ty GitHub Pages deployment pattern. Remember that GitHub Pages project sites usually deploy under a repository path, so configure Eleventy path prefix correctly for `pyconau-passkeys` unless a custom domain is used.

## Asset handling requirement

The generated slide images currently exist as PNGs. Convert them to WebP for the site while maintaining visual quality and resolution.

Recommended source layout:

```text
src/
  _data/
    talk.yaml
  _includes/
    layouts/
      base.njk
      slide.njk
  assets/
    slides/
      01-passkeys-authentication-without-shared-secrets.webp
      02-the-problem-is-not-the-user.webp
      ...
      11-fewer-passwords.webp
    css/
      theme.css
  slides/
    slides.11tydata.js or generated pagination template
  index.njk
  resources.njk
  about.njk
```

Recommended conversion command:

```bash
mkdir -p src/assets/slides
cwebp -q 92 input.png -o src/assets/slides/output.webp
```

If using Node tooling instead, use `sharp` or `@11ty/eleventy-img` to generate WebP outputs. Keep the full-size image available and let the browser scale responsively.

## Visual and thematic direction

The site should extend the slide deck, not flatten it into a generic documentation site.

Design style:

- Modern Art Nouveau
- Elegant, lyrical, technical, poetic
- Strong but controlled ornamentation
- Plum as the dominant anchor colour
- Pale cream and green-white backgrounds
- Pale yellow and peach accents
- Botanical framing, fine linework, keyhole motifs, soft arches, and subtle circuit-line overlays
- Clean readable typography for body text
- Big expressive headings with restrained ornamental character

Design principle:

> Treat each slide page like a gallery plate with technical notes below it.

## Interaction and transition recommendations

Use tasteful, accessible transitions:

- Smooth anchor scrolling on the homepage.
- Subtle fade/translate-in for slide cards using CSS only.
- Use `prefers-reduced-motion` to disable animation.
- Previous/next slide navigation should feel like moving through a gallery.
- Avoid heavy JavaScript. This is a static site, not a casino.

Suggested page structure per slide:

1. Full-width hero area with the slide image.
2. Slide title and intention.
3. Speaker track as readable prose.
4. Highlight notes in a visually distinct callout style.
5. Additional reading cards.
6. Previous / next navigation.

## CSS colour and styling definition

Use the companion file `theme.css` as the base. Core variables:

```css
:root {
  --color-plum: #474350;
  --color-mist: #F8FFF4;
  --color-cream: #FCFFEB;
  --color-pale-gold: #FAFAC6;
  --color-peach: #FECDAA;
  --color-sage: #AEBEAA;
  --color-ink: #2F2B38;
  --color-line: rgba(71, 67, 80, 0.22);
  --color-gold-line: rgba(168, 129, 58, 0.58);
}
```

## Quality bar for the coding agent

The site should look custom. Do not accept a default blog theme.

Coding agent instructions:

- Use the talk data file as the single source of truth.
- Build reusable components for slide cards, source cards, notes callouts, and previous/next navigation.
- Keep pages fast and static.
- Use semantic HTML.
- Preserve accessibility: alt text for slide images, visible focus states, good colour contrast, reduced-motion support.
- Make the site responsive, but optimise for desktop/laptop conference browsing first.
- Do not over-animate. The slides are already dramatic. The website should behave like it has a mortgage.
- Use the official 11ty deployment approach for GitHub Pages.
- Configure path prefix for `/pyconau-passkeys/` unless a custom domain is configured.
- Ensure every source link opens normally and is grouped logically on the resources page.
- Add a future `/slides/12-resources/` placeholder page.

---

# Slide-by-slide content


## Slide 1: Passkeys: Authentication Without Shared Secrets

**Route:** `/slides/01-passkeys-authentication-without-shared-secrets/`  
**Image source:** `src/assets/slides/passkeys_authentication_in_elegant_design.webp`  
**Intention:** Open with a visual statement that signals this is not a generic security deck. Establish passkeys as a structural redesign of authentication, not just another login convenience.

### Page summary
The talk introduces passkeys as authentication without reusable shared secrets. The central claim is that authentication gets stronger when we stop making humans safely manage secrets in hostile environments.

### Speaker track
Good morning. I’m going to talk about passkeys, but I want to start by saying this is not really a talk about a new login feature. It is a talk about why authentication keeps failing, why we keep blaming the wrong thing, and why passkeys represent a genuinely different model.

For decades, we have told people to choose better passwords, use password managers, enable MFA, watch out for phishing, check the URL, do not reuse passwords, do not approve strange prompts, and please somehow remember which of the fourteen login screens they saw this week were real.

And then, when it goes wrong, we often call it user error. I think that is the wrong diagnosis.

Authentication keeps failing not because people are careless, but because passwords ask humans to safely manage reusable secrets in hostile environments.

Passkeys are interesting because they do not try to make users better at that job. They remove the job.

The core idea for this talk is simple: authentication gets stronger when we stop depending on humans to manage reusable secrets.

### Highlight notes
> **Likely question:** Are passkeys just a nicer login UX? Answer: no. The UX is nicer, but the security shift is that a public/private key pair replaces a reusable shared secret.
> **Presenter emphasis:** Pause on the phrase “they remove the job.” It is the opening thesis in plain English.

### Additional reading mapped to this slide
- [passkeys.dev — What are passkeys?](https://passkeys.dev/docs/intro/what-are-passkeys/) — Clear developer-oriented explanation of passkeys, public/private keys, storage model and phishing resistance.
- [W3C Web Authentication: An API for accessing Public Key Credentials Level 3](https://www.w3.org/TR/webauthn-3/) — Primary web standard for WebAuthn, public-key credentials, relying parties, origins, challenges, authenticators, attestation and assertions.
- [FIDO Alliance — Replacing Password-Only Authentication with Passkeys in the Enterprise](https://fidoalliance.org/white-paper-replacing-password-only-authentication-with-passkeys-in-the-enterprise/) — Enterprise passkey deployment guidance, including synced versus device-bound passkeys.

## Slide 2: Authentication keeps failing

**Route:** `/slides/02-the-problem-is-not-the-user/`  
**Image source:** `src/assets/slides/authentication_challenges_with_decorative_elegance.webp`  
**Intention:** Shift blame from individual users to system design. Establish the human-centred argument that passwords require unreasonable security performance from ordinary people.

### Page summary
Password-based authentication asks users to recognise deception, manage secrets, avoid reuse and operate MFA correctly under pressure. That is a brittle design, not a moral failing.

### Speaker track
This is the uncomfortable truth: authentication keeps failing.

Not because users are stupid. Not because users hate security. Not because people need one more awareness module with a stock photo of a hacker in a hoodie.

It keeps failing because the system asks too much of them.

A normal person signing into a service is expected to do a lot of security work very quickly. They need to recognise whether the page is real. They need to use the right password. They need to avoid reusing that password somewhere else. They need to trust the right MFA prompt. They need to not be fooled by urgency, branding, email formatting, domain tricks, or a workflow that looks basically identical to the real one.

That is a lot to ask of a person who is just trying to submit an expense claim, check their email, deploy code, or buy concert tickets.

And attackers understand this very well. They do not need to defeat a mathematically perfect system. They need to defeat the human operating it under pressure.

So the first shift I want to make is this: authentication failure is often not a user behaviour problem. It is a system design problem.

If the security of the login depends on the user reliably spotting deception, then eventually deception wins.

### Highlight notes
> **Likely question:** Isn’t user training still important? Answer: yes, but training should not be the primary control for recognising fake login pages every time.
> **Site note:** Use this page to make the human-centred case before introducing any cryptography.

### Additional reading mapped to this slide
- [Australian Signals Directorate / cyber.gov.au — Phishing](https://www.cyber.gov.au/threats/types-threats/phishing) — Local authoritative explanation of phishing and how attackers trick people into disclosing credentials or linking devices.
- [CISA — Implementing Phishing-Resistant MFA](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf) — Authoritative guidance on phishing-resistant MFA and why not all MFA methods resist phishing equally.
- [OWASP Top 10 — A07 Identification and Authentication Failures](https://owasp.org/Top10/2021/A07_2021-Identification_and_Authentication_Failures/) — Useful context for account compromise, stolen credentials, credential stuffing and authentication failure risks.

## Slide 3: Passwords are shared secrets

**Route:** `/slides/03-passwords-are-shared-secrets/`  
**Image source:** `src/assets/slides/fragile_connections_shared_secrets_and_security.webp`  
**Intention:** Explain the core structural weakness of password authentication: one reusable secret is depended on by both user and service.

### Page summary
A password is valuable because it can be reused, replayed, guessed, phished, leaked or stolen. This creates risk at both the user side and service side.

### Speaker track
At the heart of the problem is the password itself.

A password is a shared secret. The user knows it. The service verifies it. In some form, both sides are involved in protecting it.

That creates a bad security shape.

The user has to protect the password from phishing, malware, reuse, shoulder surfing, bad memory, browser prompts, old notes, and whatever they named their dog in 2008.

The service has to protect password hashes, reset flows, credential databases, logging systems, support workflows, and all the other places authentication data may accidentally leak.

Even when passwords are hashed and salted properly, the model still has a core weakness: the thing being protected is reusable.

If I can convince you to type your password into the wrong place, I can try to use it in the right place. If I steal it from one service, I can try it somewhere else. If I capture it in transit through a phishing proxy, I may be able to use it before anyone knows what happened.

This is why passwords are so attractive to attackers.

A password is not just something you know. It is something an attacker can convince you to give away. And because it is reusable, one mistake can have a life beyond the moment it happened.

### Highlight notes
> **Likely question:** Are hashed passwords still dangerous? Answer: secure hashing helps, but the user still has a reusable secret that can be phished or reused elsewhere.
> **Presenter emphasis:** Avoid sounding anti-password-manager here. The target is the primitive, not people doing sensible mitigation.

### Additional reading mapped to this slide
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) — Practical application security guidance on authentication, password handling and modern best practices.
- [NIST SP 800-63B — Digital Identity Guidelines: Authentication and Lifecycle Management](https://pages.nist.gov/800-63-3/sp800-63b.html) — Authentication assurance, authenticator lifecycle, loss/revocation and verifier guidance.
- [OWASP Top 10 — A07 Identification and Authentication Failures](https://owasp.org/Top10/2021/A07_2021-Identification_and_Authentication_Failures/) — Useful context for account compromise, stolen credentials, credential stuffing and authentication failure risks.

## Slide 4: Password managers help. MFA helps.

**Route:** `/slides/04-layers-help-but-do-not-remove-the-failure-mode/`  
**Image source:** `src/assets/slides/digital_security_through_elegant_design.webp`  
**Intention:** Acknowledge existing controls fairly while explaining that many are compensating controls around a still-reusable secret.

### Page summary
Password managers, MFA, policy and training all improve security, but they often reduce risk around passwords rather than removing password failure modes entirely.

### Speaker track
Now, I want to be very clear: password managers are good. MFA is good.

Security training is not useless. Policy is not useless. Conditional access, monitoring, risk detection, all useful.

These layers matter.

Password managers reduce reuse. They help generate strong passwords. They can make phishing harder when they refuse to autofill on the wrong domain.

MFA raises the bar. It means the password alone is not enough. That is a big improvement over password-only authentication.

But these controls are often compensating for the underlying weakness rather than removing it.

The reusable secret is still there.

And attackers have adapted. We now see phishing kits that proxy real login pages. We see MFA fatigue attacks. We see users tricked into entering one-time codes. We see session tokens stolen after the login succeeds. We see support and recovery paths targeted when the primary path gets stronger.

So the point is not “MFA is bad.” That would be nonsense.

The point is that adding layers around a reusable secret is not the same as removing the reusable secret.

A stronger lock on a fragile door is still attached to a fragile door.

This is where passkeys become interesting. They change the shape of the problem.

### Highlight notes
> **Likely question:** Are you saying MFA is obsolete? Answer: no. The argument is that phishing-resistant authentication changes the underlying model; MFA remains valuable, especially when implemented with resistant methods.
> **Design note:** Use this page to keep credibility with security engineers. Do not dunk on MFA; be precise.

### Additional reading mapped to this slide
- [CISA — Implementing Phishing-Resistant MFA](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf) — Authoritative guidance on phishing-resistant MFA and why not all MFA methods resist phishing equally.
- [OWASP Multifactor Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html) — Recovery-code and fallback guidance; useful for the “recovery is part of authentication” message.
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) — Practical application security guidance on authentication, password handling and modern best practices.
- [Microsoft Learn — Passkeys (FIDO2) authentication method in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2) — Concrete enterprise identity flow showing challenge, hashed RP ID, user verification and public-key verification.

## Slide 5: Passkeys replace secrets with proof

**Route:** `/slides/05-passkeys-replace-secrets-with-proof/`  
**Image source:** `src/assets/slides/passkeys_explained_with_elegant_design.webp`  
**Intention:** Deliver the first technical mental model: registration stores a public key with the service; authentication proves possession of the private key by signing a challenge.

### Page summary
Passkeys use public-key cryptography. The private key remains on the user device or authenticator; the service stores the public key and verifies a signed challenge response.

### Speaker track
A passkey replaces the password with a public-key credential.

At a high level, this is how it works.

When you create a passkey for a service, your device or authenticator creates a key pair. There is a public key and a private key.

The public key is registered with the service. That is safe to store on the server. It is public by design.

The private key stays with your authenticator. That might be your phone, your laptop, a platform credential store, or a security key.

When you sign in, the service does not ask you to send a password. Instead, the service sends a challenge.

Your authenticator signs that challenge using the private key. The service verifies the signature using the public key.

So the service gets proof that you hold the private key, but the private key itself is never sent.

That is the critical distinction.

With passwords, authentication means proving knowledge of a shared secret. With passkeys, authentication means proving possession of a private key without revealing it.

This is much better security architecture.

The server is no longer storing password hashes that attackers can try to crack. The user is no longer typing a reusable secret into login pages. The network is no longer carrying a password that can be replayed.

The application receives proof, not a secret. That is why this slide says: passkeys replace secrets with proof.

### Highlight notes
> **Likely question:** What should developers implement? Answer: WebAuthn registration and authentication flows, preferably using mature libraries or platform identity services rather than hand-rolled crypto.
> **Presenter emphasis:** Slow down here. This is the first slide where a non-security developer builds the core mental model.

### Additional reading mapped to this slide
- [W3C Web Authentication: An API for accessing Public Key Credentials Level 3](https://www.w3.org/TR/webauthn-3/) — Primary web standard for WebAuthn, public-key credentials, relying parties, origins, challenges, authenticators, attestation and assertions.
- [Google Identity — Passkeys developer guide for relying parties](https://developers.google.com/identity/passkeys/developer-guides) — Implementation guidance covering RP ID, challenge generation, registration and authentication flows.
- [MDN — Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) — Accessible API-level WebAuthn reference for web developers.
- [web.dev — Create a passkey for passwordless logins](https://web.dev/articles/passkey-registration) — Practical implementation guidance for registration UX and WebAuthn calls.
- [passkeys.dev — What are passkeys?](https://passkeys.dev/docs/intro/what-are-passkeys/) — Clear developer-oriented explanation of passkeys, public/private keys, storage model and phishing resistance.

## Slide 6: Your face is not your password

**Route:** `/slides/06-your-face-is-not-your-password/`  
**Image source:** `src/assets/slides/biometric_security_infographic_with_floral_design.webp`  
**Intention:** Correct the common misconception that biometrics are sent to websites. Explain local unlock versus remote authentication proof.

### Page summary
Biometrics or device PINs unlock the private key locally. The website receives a signed cryptographic proof, not biometric data.

### Speaker track
One of the most common misunderstandings about passkeys is the role of biometrics.

People see Face ID, Touch ID, Windows Hello, or Android biometrics and assume their face or fingerprint is somehow being sent to the website.

That is not what is happening.

Your face is not your password. Your fingerprint is not your password. Your device PIN is not being handed to the website either.

Those things are local unlock mechanisms. They unlock access to the private key on your device.

The website receives a cryptographic proof. It does not receive your biometric data.

So when you use a passkey and unlock it with your face, the flow is not: “Here is my face, please let me in.”

The flow is: “My device has verified me locally, unlocked the private key, signed the challenge, and sent you proof.”

That difference matters. It matters for privacy. It matters for threat modelling. It matters for user trust.

Biometrics in this model are not a shared secret. They are a local gate.

And if you prefer not to use biometrics, a device PIN can often serve the same unlock role. Again, local unlock. Not server-side credential.

A useful way to explain this to users is: the biometric unlocks the key; the key signs the challenge; the service verifies the signature.

The website never needs your face. Which is good, because frankly most websites have not earned that kind of intimacy.

### Highlight notes
> **Likely question:** Are biometrics sent to the relying party? Answer: no. They are used for local user verification. The relying party receives an assertion/signature.
> **Possible page callout:** “Local unlock is not the same as a server-side credential.”

### Additional reading mapped to this slide
- [passkeys.dev — What are passkeys?](https://passkeys.dev/docs/intro/what-are-passkeys/) — Clear developer-oriented explanation of passkeys, public/private keys, storage model and phishing resistance.
- [Microsoft Learn — Passkeys (FIDO2) authentication method in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2) — Concrete enterprise identity flow showing challenge, hashed RP ID, user verification and public-key verification.
- [W3C Web Authentication: An API for accessing Public Key Credentials Level 3](https://www.w3.org/TR/webauthn-3/) — Primary web standard for WebAuthn, public-key credentials, relying parties, origins, challenges, authenticators, attestation and assertions.
- [Australian Signals Directorate / cyber.gov.au — Passkeys](https://www.cyber.gov.au/protect-yourself/secure-your-accounts/passkeys) — Plain-language Australian public guidance on passkeys; useful for audience-friendly explainer pages.

## Slide 7: Phishing works because fake doors look real

**Route:** `/slides/07-phishing-the-false-door/`  
**Image source:** `src/assets/slides/phishing_real_vs_fake_doors.webp`  
**Intention:** Introduce the first attack story. Show why phishing succeeds against password and phishable-MFA systems: attackers exploit human judgement and workflow pressure.

### Page summary
Phishing succeeds when fake login experiences are convincing enough. Attackers do not need a perfect fake; they need a plausible one at the right moment.

### Speaker track
Now let’s look at the first major real-world failure mode: phishing.

Phishing works because fake doors look real.

And attackers do not need perfect fakes. They need convincing ones.

A phishing page does not need to fool a security engineer calmly examining TLS certificates over coffee.

It needs to fool a busy person who has a task to complete, an email that looks plausible, and a login screen that looks close enough.

Modern phishing can be very polished. The branding is copied. The login flow is familiar. The URL is close enough to pass a quick glance. The email has urgency. The page may even relay the real login process in the background.

This is especially important with MFA.

A lot of people think MFA means phishing stops. It does not.

Some forms of MFA are much more resistant than others, but codes and push approvals can still be captured or manipulated.

In a reverse-proxy phishing attack, the attacker can sit between the user and the real service. The user thinks they are signing in normally. The attacker relays the interaction and captures the resulting session.

So once again, the problem is not that the user failed to read carefully enough.

The problem is that the security model asked the user to determine whether the door was real. And that is exactly the kind of judgement attackers are good at exploiting.

### Highlight notes
> **Likely question:** Does MFA stop phishing? Answer: some MFA is phishing-resistant, but codes, push approvals and weaker flows can still be phished or proxied.
> **Presenter emphasis:** This is the threat story that makes origin binding matter. Do not jump to the solution too quickly.

### Additional reading mapped to this slide
- [Australian Signals Directorate / cyber.gov.au — Phishing](https://www.cyber.gov.au/threats/types-threats/phishing) — Local authoritative explanation of phishing and how attackers trick people into disclosing credentials or linking devices.
- [CISA — Implementing Phishing-Resistant MFA](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf) — Authoritative guidance on phishing-resistant MFA and why not all MFA methods resist phishing equally.
- [OWASP Multifactor Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html) — Recovery-code and fallback guidance; useful for the “recovery is part of authentication” message.

## Slide 8: Passkeys are bound to the real origin

**Route:** `/slides/08-origin-binding/`  
**Image source:** `src/assets/slides/passkeys_and_origin_binding_infographic.webp`  
**Intention:** Explain the strongest security claim: passkeys reduce credential phishing because credentials are scoped to the legitimate relying party/origin.

### Page summary
A passkey created for one relying party is not available to a lookalike site. The browser and authenticator enforce where the credential belongs, moving trust out of user judgement.

### Speaker track
This is where passkeys change the phishing story.

Passkeys are bound to the real origin.

A passkey created for example.com is not valid for evil-example.com.

Even if the fake site looks perfect, even if the logo is correct, even if the colours match, even if the attacker has built something beautiful and deeply annoying, the credential does not belong there.

The browser and authenticator enforce the origin binding.

That means the user is no longer solely responsible for visually inspecting the page and deciding if it is real.

The authentication system itself knows where the credential belongs.

This is one of the most important ideas in the whole talk: passkeys move trust from human judgement to cryptographic proof.

That is a big deal.

Because humans are inconsistent at spotting phishing. They get tired. They get rushed. They use small screens. They work across lots of services. They get interrupted. They are human, which historically has been a difficult patch cycle.

Cryptographic origin binding is not perfect magic, but it removes one of the worst expectations we place on users.

Instead of saying, “Please identify the real login page every time,” we say, “This credential only works with the origin it was created for.”

That is a better division of labour.

Humans should not be the phishing detection engine. The protocol should do more of the work.

### Highlight notes
> **Origin-binding note:** A WebAuthn credential is scoped to a relying party. The browser and authenticator prevent the credential being used by unrelated origins.
> **Likely question:** Does origin binding eliminate phishing completely? Answer: no. It strongly resists credential phishing, but session theft, endpoint compromise, OAuth consent abuse and recovery attacks still matter.
> **Key line:** “Passkeys move trust from human judgement to cryptographic proof.”

### Additional reading mapped to this slide
- [W3C Web Authentication: An API for accessing Public Key Credentials Level 3](https://www.w3.org/TR/webauthn-3/) — Primary web standard for WebAuthn, public-key credentials, relying parties, origins, challenges, authenticators, attestation and assertions.
- [passkeys.dev — What are passkeys?](https://passkeys.dev/docs/intro/what-are-passkeys/) — Clear developer-oriented explanation of passkeys, public/private keys, storage model and phishing resistance.
- [Google Identity — Passkeys developer guide for relying parties](https://developers.google.com/identity/passkeys/developer-guides) — Implementation guidance covering RP ID, challenge generation, registration and authentication flows.
- [Microsoft Learn — Passkeys (FIDO2) authentication method in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2) — Concrete enterprise identity flow showing challenge, hashed RP ID, user verification and public-key verification.
- [CISA — Implementing Phishing-Resistant MFA](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf) — Authoritative guidance on phishing-resistant MFA and why not all MFA methods resist phishing equally.

## Slide 9: Password reuse turns one breach into many compromises

**Route:** `/slides/09-password-reuse-one-breach-many-compromises/`  
**Image source:** `src/assets/slides/password_reuse_a_dangerous_connection.webp`  
**Intention:** Introduce the second attack story: password reuse and credential stuffing turn isolated breaches into cross-site compromise.

### Page summary
Reusable passwords are portable. Attackers exploit that portability by trying breached credentials across email, shopping, banking, source code and cloud services.

### Speaker track
The second real-world failure mode is password reuse.

Password reuse is not mysterious. It is rational behaviour in an unreasonable system.

People have too many accounts. Too many login screens. Too many rules. Too many password expiry memories from ancient enterprise systems that should have been taken out behind the shed years ago.

So people reuse passwords. Or they use patterns. Or they use one strong password in several places because they think those places are important.

The problem is that a reusable secret does not stay contained.

If one service is breached and credentials are exposed, attackers try those credentials elsewhere.

Email. Shopping. Banking. Source code. Cloud platforms.

This is credential stuffing. And it works because passwords are portable.

The attacker does not need to compromise every service independently if users have linked them together with the same secret.

This is why one weak or breached service can become a stepping stone into something much more important.

The user may think they created separate accounts. But if the same password unlocks several of them, the attacker sees one connected surface.

The password becomes a skeleton key. And skeleton keys are excellent, unless you are the skeleton.

### Highlight notes
> **Likely question:** Can password managers solve reuse? Answer: they help a lot, but passkeys remove the reusable credential from the service login flow entirely.
> **Site note:** This page should explain credential stuffing plainly and map it to account compromise risk.

### Additional reading mapped to this slide
- [OWASP Top 10 — A07 Identification and Authentication Failures](https://owasp.org/Top10/2021/A07_2021-Identification_and_Authentication_Failures/) — Useful context for account compromise, stolen credentials, credential stuffing and authentication failure risks.
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) — Practical application security guidance on authentication, password handling and modern best practices.
- [Australian Signals Directorate / cyber.gov.au — Passkeys](https://www.cyber.gov.au/protect-yourself/secure-your-accounts/passkeys) — Plain-language Australian public guidance on passkeys; useful for audience-friendly explainer pages.

## Slide 10: A passkey for one service is useless somewhere else

**Route:** `/slides/10-unique-per-service/`  
**Image source:** `src/assets/slides/distinct_keys_for_distinct_services.webp`  
**Intention:** Resolve the password-reuse problem by showing that each service receives a distinct key pair and a breach of public keys does not create reusable credentials.

### Page summary
Passkeys are unique per relying party. Public keys are stored by the service; private keys stay with the user’s authenticator. A credential for one service is not useful at another.

### Speaker track
Passkeys change this as well.

Each service gets a distinct key pair.

Your passkey for email is not your passkey for shopping. Your passkey for source control is not your passkey for banking.

Your passkey for one service is useless somewhere else.

That means the cross-site compromise pattern changes.

If a service storing passkey public keys is breached, the attacker gets public keys. Public keys are designed to be public. They do not let the attacker sign in.

The private keys remain with the user’s authenticator.

There is no password database to crack in the traditional sense. There is no shared secret to replay against another site. There is no single reused credential that suddenly opens five doors.

This does not mean breaches no longer matter.

Of course they matter. Attackers may still steal personal data, session tokens, recovery channels, application data, or exploit other weaknesses.

Passkeys are not fairy dust.

But they remove one extremely common and useful attacker pattern: taking a reusable password from one context and trying it in another.

That is the power of changing the primitive.

You are not asking users to avoid reuse. You are removing the reusable thing. That is much stronger than policy.

### Highlight notes
> **Likely question:** What if the server database is breached? Answer: the server stores public keys, not reusable secrets. Other data may still be sensitive, but the public key alone cannot be replayed as a password.
> **Presenter emphasis:** Say “not fairy dust” to keep the claim defensible and avoid over-selling.

### Additional reading mapped to this slide
- [W3C Web Authentication: An API for accessing Public Key Credentials Level 3](https://www.w3.org/TR/webauthn-3/) — Primary web standard for WebAuthn, public-key credentials, relying parties, origins, challenges, authenticators, attestation and assertions.
- [passkeys.dev — What are passkeys?](https://passkeys.dev/docs/intro/what-are-passkeys/) — Clear developer-oriented explanation of passkeys, public/private keys, storage model and phishing resistance.
- [Google Identity — Passkeys developer guide for relying parties](https://developers.google.com/identity/passkeys/developer-guides) — Implementation guidance covering RP ID, challenge generation, registration and authentication flows.
- [OWASP Top 10 — A07 Identification and Authentication Failures](https://owasp.org/Top10/2021/A07_2021-Identification_and_Authentication_Failures/) — Useful context for account compromise, stolen credentials, credential stuffing and authentication failure risks.

## Slide 11: The future of authentication is fewer passwords

**Route:** `/slides/11-fewer-passwords/`  
**Image source:** `src/assets/slides/the_future_of_authentication.webp`  
**Intention:** Close with the thesis. Passkeys are not perfect identity security, but they remove some of the worst password failure modes by design.

### Page summary
The future is not more password advice. It is reducing dependence on passwords by moving to authentication models that use proof instead of reusable shared secrets.

### Speaker track
So where does this leave us?

The future of authentication is not better password advice. It is fewer passwords.

For years, we have tried to improve authentication by improving user behaviour around passwords.

Make them longer. Make them more complex. Store them better. Rotate them. Do not rotate them. Add MFA. Add phishing training. Add warnings. Add recovery questions. Remove recovery questions because apparently everyone’s first pet was a security incident.

Some of those improvements helped. Some made things worse. Many were reasonable responses to a bad underlying model.

But the important shift with passkeys is that we can stop asking the user to manage a reusable shared secret.

That does not solve every identity problem.

We still need good recovery flows. We still need secure devices. We still need thoughtful enrolment. We still need good application design. We still need to handle migration, accessibility, enterprise policy, account lifecycle, and support.

But passkeys remove some of the worst failure modes by design.

They reduce phishing risk through origin binding. They reduce credential stuffing by using unique credentials per service. They improve usability by letting people sign in with devices and unlock methods they already understand. They allow authentication to become more secure and less hostile at the same time.

That combination is rare.

Usually we trade usability for security, then act surprised when people route around us.

Passkeys are interesting because they point to a better deal.

Not perfect authentication. Not magic. Not the end of identity security.

But a better primitive.

A model where the server stores public keys, the device protects private keys, and users are no longer expected to perfectly operate reusable secrets in a world designed to trick them.

So my closing argument is this: authentication should not depend on perfect humans.

The future is not better password advice. It is fewer passwords.

### Highlight notes
> **Likely question:** What are the limitations? Answer: recovery, device lifecycle, endpoint security, session protection, assurance differences and adoption UX still matter.
> **Closing note:** This slide should be the emotional landing point. Avoid adding extra content after it unless Slide 12 is a QR/resources slide.

### Additional reading mapped to this slide
- [FIDO Alliance — Replacing Password-Only Authentication with Passkeys in the Enterprise](https://fidoalliance.org/white-paper-replacing-password-only-authentication-with-passkeys-in-the-enterprise/) — Enterprise passkey deployment guidance, including synced versus device-bound passkeys.
- [FIDO Alliance — Multi-Device FIDO Credentials](https://fidoalliance.org/white-paper-multi-device-fido-credentials/) — Explains multi-device credentials and why synced credentials improve recoverability and adoption.
- [NIST SP 800-63B — Digital Identity Guidelines: Authentication and Lifecycle Management](https://pages.nist.gov/800-63-3/sp800-63b.html) — Authentication assurance, authenticator lifecycle, loss/revocation and verifier guidance.
- [OWASP Multifactor Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html) — Recovery-code and fallback guidance; useful for the “recovery is part of authentication” message.
- [passkeys.dev — What are passkeys?](https://passkeys.dev/docs/intro/what-are-passkeys/) — Clear developer-oriented explanation of passkeys, public/private keys, storage model and phishing resistance.

## Slide 12: Resources and further reading

**Route:** `/slides/12-resources/`  
**Image source:** `src/assets/slides/slide-12-resources-placeholder.webp`  
**Intention:** Future slide for QR code, repository link and companion website resources. This should be generated after the website URL is known.

### Page summary
A future companion slide should provide a QR code to the GitHub Pages site, source list and practical implementation resources.

### Speaker track
Optional final housekeeping slide after Q&A or before Q&A. Keep it quiet and practical: “The slides, notes and references are available here.”

### Highlight notes
> **Future build note:** Generate this slide once the GitHub Pages URL is confirmed. Include QR code, short URL, repo link and “Further reading” callout.

### Additional reading mapped to this slide
- [Eleventy official documentation](https://www.11ty.dev/) — Primary documentation for the recommended static-site generator.
- [Eleventy — Deployment to GitHub Pages](https://www.11ty.dev/docs/deployment/) — Official deployment guidance for Eleventy on GitHub Pages using GitHub Actions.
- [passkeys.dev — Developer resources](https://passkeys.dev/) — Vendor-neutral passkey implementation resource maintained by members of the W3C Web Identity & Credentials Adoption Community Group and FIDO Alliance.
- [W3C Web Authentication: An API for accessing Public Key Credentials Level 3](https://www.w3.org/TR/webauthn-3/) — Primary web standard for WebAuthn, public-key credentials, relying parties, origins, challenges, authenticators, attestation and assertions.


---

# Consolidated authoritative source catalogue

- **W3C Web Authentication: An API for accessing Public Key Credentials Level 3** — https://www.w3.org/TR/webauthn-3/  
  _standard: Primary web standard for WebAuthn, public-key credentials, relying parties, origins, challenges, authenticators, attestation and assertions._
- **passkeys.dev — What are passkeys?** — https://passkeys.dev/docs/intro/what-are-passkeys/  
  _developer reference: Clear developer-oriented explanation of passkeys, public/private keys, storage model and phishing resistance._
- **passkeys.dev — Developer resources** — https://passkeys.dev/  
  _developer reference: Vendor-neutral passkey implementation resource maintained by members of the W3C Web Identity & Credentials Adoption Community Group and FIDO Alliance._
- **FIDO Alliance — Replacing Password-Only Authentication with Passkeys in the Enterprise** — https://fidoalliance.org/white-paper-replacing-password-only-authentication-with-passkeys-in-the-enterprise/  
  _industry body white paper: Enterprise passkey deployment guidance, including synced versus device-bound passkeys._
- **FIDO Alliance — Multi-Device FIDO Credentials** — https://fidoalliance.org/white-paper-multi-device-fido-credentials/  
  _industry body white paper: Explains multi-device credentials and why synced credentials improve recoverability and adoption._
- **NIST SP 800-63B — Digital Identity Guidelines: Authentication and Lifecycle Management** — https://pages.nist.gov/800-63-3/sp800-63b.html  
  _government standard/guideline: Authentication assurance, authenticator lifecycle, loss/revocation and verifier guidance._
- **CISA — Implementing Phishing-Resistant MFA** — https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf  
  _government guidance: Authoritative guidance on phishing-resistant MFA and why not all MFA methods resist phishing equally._
- **OWASP Authentication Cheat Sheet** — https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html  
  _application security guidance: Practical application security guidance on authentication, password handling and modern best practices._
- **OWASP Multifactor Authentication Cheat Sheet** — https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html  
  _application security guidance: Recovery-code and fallback guidance; useful for the “recovery is part of authentication” message._
- **OWASP Top 10 — A07 Identification and Authentication Failures** — https://owasp.org/Top10/2021/A07_2021-Identification_and_Authentication_Failures/  
  _application security reference: Useful context for account compromise, stolen credentials, credential stuffing and authentication failure risks._
- **Google Identity — Passkeys developer guide for relying parties** — https://developers.google.com/identity/passkeys/developer-guides  
  _hyperscaler developer documentation: Implementation guidance covering RP ID, challenge generation, registration and authentication flows._
- **web.dev — Create a passkey for passwordless logins** — https://web.dev/articles/passkey-registration  
  _developer documentation: Practical implementation guidance for registration UX and WebAuthn calls._
- **MDN — Web Authentication API** — https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API  
  _developer documentation: Accessible API-level WebAuthn reference for web developers._
- **Microsoft Learn — Passkeys (FIDO2) authentication method in Microsoft Entra ID** — https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2  
  _hyperscaler/identity platform documentation: Concrete enterprise identity flow showing challenge, hashed RP ID, user verification and public-key verification._
- **Microsoft Learn — Enable passkeys in Authenticator for Microsoft Entra ID** — https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-enable-authenticator-passkey  
  _hyperscaler/identity platform documentation: Practical enterprise enablement guidance and conditional access/authentication strength linkage._
- **Australian Signals Directorate / cyber.gov.au — Passkeys** — https://www.cyber.gov.au/protect-yourself/secure-your-accounts/passkeys  
  _Australian government public guidance: Plain-language Australian public guidance on passkeys; useful for audience-friendly explainer pages._
- **Australian Signals Directorate / cyber.gov.au — Phishing** — https://www.cyber.gov.au/threats/types-threats/phishing  
  _Australian government public guidance: Local authoritative explanation of phishing and how attackers trick people into disclosing credentials or linking devices._
- **Eleventy official documentation** — https://www.11ty.dev/  
  _SSG documentation: Primary documentation for the recommended static-site generator._
- **Eleventy — Deployment to GitHub Pages** — https://www.11ty.dev/docs/deployment/  
  _SSG deployment documentation: Official deployment guidance for Eleventy on GitHub Pages using GitHub Actions._

## Recommended additional artefacts for the repo

Create these files in the project:

- `README.md` — explain the talk, build commands, deployment, image conversion workflow.
- `src/_data/talk.yaml` — structured source of truth for slides.
- `src/assets/css/theme.css` — design system and components.
- `.github/workflows/deploy.yml` — GitHub Pages deployment.
- `scripts/convert-slides.mjs` — optional script using `sharp` to convert PNG to WebP.
- `docs/source-credibility.md` — optional short note explaining why sources are standards/government/developer documentation.

## Suggested README build commands

```bash
npm install
npm run dev
npm run build
```

Suggested `package.json` scripts:

```json
{
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy",
    "convert:slides": "node scripts/convert-slides.mjs"
  }
}
```
