/*==================== SHOW / HIDE MENU MOBILE ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/* Remove menu on mobile link click */
const navLinks = document.querySelectorAll('.nav__link')
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('show-menu')
        }
    })
})

/*==================== CHANGE BACKGROUND HEADER ====================*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    if (header) {
        window.scrollY >= 50 ? header.classList.add('bg-header')
                             : header.classList.remove('bg-header')
    }
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/
const scrollUp = () => {
    const scrollUpBtn = document.getElementById('scroll-up')
    if (scrollUpBtn) {
        window.scrollY >= 350 ? scrollUpBtn.classList.add('show-scroll')
                              : scrollUpBtn.classList.remove('show-scroll')
    }
}
window.addEventListener('scroll', scrollUp)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 70,
              sectionId = current.getAttribute('id'),
              sectionLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (sectionLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionLink.classList.add('active-link')
            } else {
                sectionLink.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== TOAST NOTIFICATION UTILITY ====================*/
const showToast = (message) => {
    const toast = document.getElementById('toast-notice')
    const toastMsg = document.getElementById('toast-message')
    if (!toast || !toastMsg) return

    toastMsg.textContent = message
    toast.classList.add('show')

    clearTimeout(window._toastTimeout)
    window._toastTimeout = setTimeout(() => {
        toast.classList.remove('show')
    }, 3200)
}

/*==================== WEB AUDIO API SYNTHESIZER ====================*/
/* Zero external files needed - pure melodic holiday bells & chimes */
let audioCtx = null

function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        if (AudioContextClass) {
            audioCtx = new AudioContextClass()
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume()
    }
    return audioCtx
}

// Play a bell / celesta note
function playCelestaNote(freq, timeOffset = 0, duration = 1.0, gainVal = 0.18) {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime + timeOffset
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    // Bell overtones: mix sine and triangle
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)

    // Gentle celesta chime envelope
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(gainVal, now + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + duration)
}

// Play joyful chime when interacting
function playChime() {
    try {
        playCelestaNote(523.25, 0, 0.8, 0.12)    // C5
        playCelestaNote(659.25, 0.1, 0.8, 0.14)  // E5
        playCelestaNote(783.99, 0.2, 1.2, 0.16)  // G5
        playCelestaNote(1046.50, 0.3, 1.5, 0.18) // C6
    } catch (e) {
        console.warn('Audio not enabled yet:', e)
    }
}

// Play gentle church bell chime
function playChurchBell() {
    try {
        playCelestaNote(261.63, 0, 2.5, 0.25)    // C4 low resonance
        playCelestaNote(523.25, 0.05, 2.2, 0.2)  // C5
        playCelestaNote(783.99, 0.1, 2.0, 0.15)  // G5
    } catch (e) {
        console.warn(e)
    }
}

// Holiday Melody: Jingle Bells refrain
let isMelodyPlaying = false
let melodyTimeoutId = null

const jingleBellsNotes = [
    { note: 659.25, dur: 0.35, pause: 0.4 },  // E5
    { note: 659.25, dur: 0.35, pause: 0.4 },  // E5
    { note: 659.25, dur: 0.65, pause: 0.8 },  // E5
    { note: 659.25, dur: 0.35, pause: 0.4 },  // E5
    { note: 659.25, dur: 0.35, pause: 0.4 },  // E5
    { note: 659.25, dur: 0.65, pause: 0.8 },  // E5
    { note: 659.25, dur: 0.35, pause: 0.4 },  // E5
    { note: 783.99, dur: 0.35, pause: 0.4 },  // G5
    { note: 523.25, dur: 0.4, pause: 0.45 },  // C5
    { note: 587.33, dur: 0.35, pause: 0.4 },  // D5
    { note: 659.25, dur: 1.1, pause: 1.2 },   // E5
    { note: 698.46, dur: 0.35, pause: 0.4 },  // F5
    { note: 698.46, dur: 0.35, pause: 0.4 },  // F5
    { note: 698.46, dur: 0.4, pause: 0.45 },  // F5
    { note: 698.46, dur: 0.35, pause: 0.4 },  // F5
    { note: 698.46, dur: 0.35, pause: 0.4 },  // F5
    { note: 659.25, dur: 0.35, pause: 0.4 },  // E5
    { note: 659.25, dur: 0.35, pause: 0.4 },  // E5
    { note: 783.99, dur: 0.35, pause: 0.4 },  // G5
    { note: 783.99, dur: 0.35, pause: 0.4 },  // G5
    { note: 698.46, dur: 0.35, pause: 0.4 },  // F5
    { note: 587.33, dur: 0.35, pause: 0.4 },  // D5
    { note: 523.25, dur: 1.2, pause: 1.4 }    // C5
]

function toggleHolidayMelody() {
    const musicBtn = document.getElementById('music-toggle')
    const musicIcon = document.getElementById('music-icon')

    if (isMelodyPlaying) {
        isMelodyPlaying = false
        if (musicBtn) musicBtn.classList.remove('active')
        if (musicIcon) musicIcon.className = 'ri-music-2-line'
        clearTimeout(melodyTimeoutId)
        showToast('Holiday music stopped 🎵')
        return
    }

    isMelodyPlaying = true
    if (musicBtn) musicBtn.classList.add('active')
    if (musicIcon) musicIcon.className = 'ri-volume-up-line'
    showToast('Playing Jingle Bells Music Box 🔔')

    let currentOffset = 0
    jingleBellsNotes.forEach((item, index) => {
        melodyTimeoutId = setTimeout(() => {
            if (!isMelodyPlaying) return
            playCelestaNote(item.note, 0, item.dur, 0.16)
            if (index === jingleBellsNotes.length - 1) {
                // Loop or stop
                setTimeout(() => {
                    if (isMelodyPlaying) {
                        toggleHolidayMelody() // Turn off after complete stanza
                    }
                }, 1400)
            }
        }, currentOffset * 1000)
        currentOffset += item.pause
    })
}

const musicToggleBtn = document.getElementById('music-toggle')
if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', toggleHolidayMelody)
}

const heroMelodyBtn = document.getElementById('btn-play-melody')
if (heroMelodyBtn) {
    heroMelodyBtn.addEventListener('click', () => {
        if (!isMelodyPlaying) {
            toggleHolidayMelody()
        } else {
            playChime()
        }
    })
}

/*==================== INTERACTIVE CANVAS SNOWFALL ====================*/
const canvas = document.getElementById('snow-canvas')
let ctx = canvas ? canvas.getContext('2d') : null

let snowflakes = []
let snowMode = 'normal' // 'normal', 'blizzard', 'gentle', 'off'
let mouseX = 0
let mouseY = 0

function resizeSnowCanvas() {
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initSnowflakes()
}

function initSnowflakes() {
    snowflakes = []
    if (snowMode === 'off') return

    let count = Math.floor(window.innerWidth / 12)
    if (snowMode === 'blizzard') count = Math.floor(window.innerWidth / 6)
    if (snowMode === 'gentle') count = Math.floor(window.innerWidth / 24)

    for (let i = 0; i < count; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2.8 + 0.8,
            density: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.7 + 0.3,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.03 + 0.01,
            speedY: Math.random() * 1.5 + 0.8
        })
    }
}

function renderSnow() {
    if (!ctx || !canvas) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (snowMode === 'off') {
        requestAnimationFrame(renderSnow)
        return
    }

    ctx.fillStyle = '#ffffff'

    for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i]

        ctx.beginPath()
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`
        ctx.fill()

        flake.wobble += flake.wobbleSpeed
        flake.y += flake.speedY * (snowMode === 'blizzard' ? 2.2 : 1)
        flake.x += Math.sin(flake.wobble) * 0.8

        // Mouse gentle wind deflection
        const dx = mouseX - flake.x
        const dy = mouseY - flake.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
            flake.x -= (dx / dist) * 1.5
        }

        // Reset when passing bottom or sides
        if (flake.y > canvas.height + 5) {
            flake.y = -5
            flake.x = Math.random() * canvas.width
        }
        if (flake.x > canvas.width + 5) flake.x = -5
        if (flake.x < -5) flake.x = canvas.width + 5
    }

    requestAnimationFrame(renderSnow)
}

if (canvas) {
    window.addEventListener('resize', resizeSnowCanvas)
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
    })
    resizeSnowCanvas()
    requestAnimationFrame(renderSnow)
}

// Snow intensity toggle button in header
const snowToggleBtn = document.getElementById('snow-toggle')
const snowIconEl = document.getElementById('snow-icon')

function updateSnowButtonVisuals() {
    if (!snowToggleBtn) return
    snowToggleBtn.classList.remove('snow-blizzard', 'snow-gentle', 'snow-off')
    if (snowMode === 'blizzard') {
        snowToggleBtn.classList.add('snow-blizzard')
        snowToggleBtn.title = 'Snowfall: Blizzard Mode ❄️ (Click to change)'
    } else if (snowMode === 'gentle') {
        snowToggleBtn.classList.add('snow-gentle')
        snowToggleBtn.title = 'Snowfall: Gentle Flurry ✨ (Click to change)'
    } else if (snowMode === 'off') {
        snowToggleBtn.classList.add('snow-off')
        snowToggleBtn.title = 'Snowfall: Paused 🌙 (Click to change)'
    } else {
        snowToggleBtn.title = 'Snowfall: Normal ❄️ (Click to change)'
    }
}

if (snowToggleBtn) {
    snowToggleBtn.addEventListener('click', () => {
        playChime()
        if (snowMode === 'normal') {
            snowMode = 'blizzard'
            showToast('❄️ Blizzard Snowfall activated!')
        } else if (snowMode === 'blizzard') {
            snowMode = 'gentle'
            showToast('✨ Gentle Flurry activated!')
        } else if (snowMode === 'gentle') {
            snowMode = 'off'
            showToast('🌙 Snowfall paused')
        } else {
            snowMode = 'normal'
            showToast('❄️ Normal Holiday Snowfall')
        }
        updateSnowButtonVisuals()
        initSnowflakes()
    })
    updateSnowButtonVisuals()
}

/*==================== LIVE CHRISTMAS COUNTDOWN ====================*/
function updateCountdown() {
    const daysEl = document.getElementById('days')
    const hoursEl = document.getElementById('hours')
    const minutesEl = document.getElementById('minutes')
    const secondsEl = document.getElementById('seconds')

    if (!daysEl) return

    const now = new Date()
    let currentYear = now.getFullYear()
    let christmas = new Date(currentYear, 11, 25, 0, 0, 0)

    if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25, 0, 0, 0)
    }

    const diff = christmas - now

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / 1000 / 60) % 60)
    const seconds = Math.floor((diff / 1000) % 60)

    daysEl.textContent = String(days).padStart(2, '0')
    hoursEl.textContent = String(hours).padStart(2, '0')
    minutesEl.textContent = String(minutes).padStart(2, '0')
    secondsEl.textContent = String(seconds).padStart(2, '0')
}
setInterval(updateCountdown, 1000)
updateCountdown()

/*==================== KINDNESS TIP GENERATOR ====================*/
const kindnessTips = [
    '"Call an old friend you haven\'t spoken with this year to wish them a peaceful holiday."',
    '"Bake holiday cookies and deliver them to a neighbor or local community helper."',
    '"Write a handwritten note of heartfelt gratitude to someone who made your year special."',
    '"Donate warm socks, blankets, or canned food to your nearest community winter drive."',
    '"Surprise someone with their favorite hot chocolate or coffee on a chilly morning."',
    '"Give genuine compliments to three strangers today and brighten their season."',
    '"Offer to help a busy family member or friend wrap their gifts or prepare holiday dinner."'
]

let currentTipIndex = 0
const tipTextEl = document.getElementById('kindness-tip-text')
const nextTipBtn = document.getElementById('next-tip-btn')

if (nextTipBtn && tipTextEl) {
    nextTipBtn.addEventListener('click', () => {
        playChime()
        currentTipIndex = (currentTipIndex + 1) % kindnessTips.length
        tipTextEl.style.opacity = '0'
        setTimeout(() => {
            tipTextEl.textContent = kindnessTips[currentTipIndex]
            tipTextEl.style.opacity = '1'
        }, 200)
    })
}

/*==================== GREETING CARD CREATOR STUDIO ====================*/
const cardRecipientInput = document.getElementById('card-recipient')
const cardCustomMsgInput = document.getElementById('card-custom-msg')
const cardSenderInput = document.getElementById('card-sender')
const cardPresetSelect = document.getElementById('card-preset-select')

const previewTo = document.getElementById('preview-to')
const previewMessage = document.getElementById('preview-message')
const previewFrom = document.getElementById('preview-from')
const previewCard = document.getElementById('card-preview-card')

if (cardRecipientInput && previewTo) {
    cardRecipientInput.addEventListener('input', (e) => {
        previewTo.textContent = e.target.value.trim() || 'Dearest One'
    })
}

if (cardCustomMsgInput && previewMessage) {
    cardCustomMsgInput.addEventListener('input', (e) => {
        previewMessage.textContent = `"${e.target.value.trim() || 'Merry Christmas!'}"`
    })
}

if (cardSenderInput && previewFrom) {
    cardSenderInput.addEventListener('input', (e) => {
        previewFrom.textContent = e.target.value.trim() || 'With Love'
    })
}

if (cardPresetSelect && cardCustomMsgInput) {
    cardPresetSelect.addEventListener('change', (e) => {
        if (e.target.value !== 'custom') {
            cardCustomMsgInput.value = e.target.value
            if (previewMessage) {
                previewMessage.textContent = `"${e.target.value}"`
            }
        } else {
            cardCustomMsgInput.focus()
        }
    })
}

// Theme buttons
const themeBtns = document.querySelectorAll('.theme-btn')
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        themeBtns.forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        playChime()

        const theme = btn.getAttribute('data-theme')
        if (previewCard) {
            previewCard.classList.remove('theme-gold', 'theme-pine')
            if (theme === 'gold') previewCard.classList.add('theme-gold')
            if (theme === 'pine') previewCard.classList.add('theme-pine')
        }
    })
})

// Copy message button
const copyCardBtn = document.getElementById('btn-copy-card')
if (copyCardBtn) {
    copyCardBtn.addEventListener('click', () => {
        const to = cardRecipientInput ? cardRecipientInput.value.trim() : 'Dearest Friends'
        const msg = cardCustomMsgInput ? cardCustomMsgInput.value.trim() : ''
        const from = cardSenderInput ? cardSenderInput.value.trim() : 'With Love'

        const fullText = `🎄 ${to},\n\n${msg}\n\n${from} ✨\n(Merry Christmas 2026)`

        navigator.clipboard.writeText(fullText).then(() => {
            playChime()
            showToast('📋 Holiday greeting copied to clipboard!')
        }).catch(() => {
            showToast('Greeting ready to share!')
        })
    })
}

// Send Virtual Hug button
const sendHugBtn = document.getElementById('btn-send-hug')
if (sendHugBtn) {
    sendHugBtn.addEventListener('click', () => {
        playChime()
        showToast('❤️ A warm holiday hug was sent with love!')
        createHeartBurst()
    })
}

// Floating hearts burst animation
function createHeartBurst() {
    const symbols = ['❤️', '✨', '❄️', '🎁', '⭐', '🕊️']
    for (let i = 0; i < 18; i++) {
        const span = document.createElement('span')
        span.textContent = symbols[Math.floor(Math.random() * symbols.length)]
        span.style.position = 'fixed'
        span.style.left = `${50 + (Math.random() * 20 - 10)}%`
        span.style.top = `${60 + (Math.random() * 20 - 10)}%`
        span.style.fontSize = `${Math.random() * 20 + 16}px`
        span.style.zIndex = '9999'
        span.style.pointerEvents = 'none'
        span.style.transition = 'all 1.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
        span.style.transform = 'translate(-50%, -50%) scale(0.5)'
        span.style.opacity = '1'

        document.body.appendChild(span)

        requestAnimationFrame(() => {
            const destX = (Math.random() - 0.5) * 400
            const destY = -Math.random() * 300 - 50
            span.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(1.4) rotate(${Math.random() * 60 - 30}deg)`
            span.style.opacity = '0'
        })

        setTimeout(() => {
            if (span.parentNode) span.parentNode.removeChild(span)
        }, 1700)
    }
}

/*==================== WISH WALL INTERACTION ====================*/
const wishForm = document.getElementById('new-wish-form')
const wishesGrid = document.getElementById('wishes-grid')

if (wishForm && wishesGrid) {
    wishForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const authorInput = document.getElementById('wish-author')
        const tagInput = document.getElementById('wish-tag')
        const contentInput = document.getElementById('wish-content')

        const author = authorInput ? authorInput.value.trim() : 'Anonymous'
        const tag = tagInput ? tagInput.value : '✨ Holiday Blessing'
        const content = contentInput ? contentInput.value.trim() : ''

        if (!content) return

        const card = document.createElement('div')
        card.className = 'wish-item glass-card'
        card.style.opacity = '0'
        card.style.transform = 'translateY(-20px)'
        card.style.transition = 'all 0.5s ease'

        card.innerHTML = `
            <div class="wish-item__tag">
                <i class="ri-sparkling-fill"></i> ${tag}
            </div>
            <p class="wish-item__text">
                "${content}"
            </p>
            <div class="wish-item__author">
                <span>${author}</span>
                <span>✨ Just now</span>
            </div>
        `

        wishesGrid.prepend(card)

        requestAnimationFrame(() => {
            card.style.opacity = '1'
            card.style.transform = 'translateY(0)'
        })

        playChime()
        showToast('🌟 Your wish has been pinned to the Holiday Wall!')

        wishForm.reset()
    })
}

/*==================== CANDLE LIGHTING EXPERIENCE ====================*/
const lightCandleBtn = document.getElementById('btn-light-candle')
const candleFlame = document.getElementById('candle-flame')
const candleCountEl = document.getElementById('candle-count')
let isCandleLit = true
let candleCount = 1842

if (lightCandleBtn && candleFlame) {
    lightCandleBtn.addEventListener('click', () => {
        playChurchBell()

        candleFlame.classList.add('lit')
        candleFlame.style.animation = 'flicker 0.4s infinite ease-in-out alternate'

        setTimeout(() => {
            candleFlame.style.animation = 'flicker 1.2s infinite ease-in-out alternate'
        }, 1200)

        candleCount++
        if (candleCountEl) {
            candleCountEl.textContent = candleCount.toLocaleString()
        }

        showToast('🕯️ Thank you for lighting a holiday candle of peace & hope!')
        createHeartBurst()
    })
}

/*==================== PARALLAX INITIALIZATION ====================*/
try {
    if (typeof Rellax !== 'undefined' && window.innerWidth > 576) {
        new Rellax('.parallax', {
            speed: -2,
            center: false,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false
        })
    }
} catch (e) {
    console.warn('Parallax init notice:', e)
}

/*==================== GSAP INTRO ANIMATION ====================*/
try {
    if (typeof gsap !== 'undefined') {
        gsap.from('.home__village', { duration: 1.2, opacity: 0, y: 80, delay: 0.1, ease: 'power2.out' })
        gsap.from('.home__pine', { duration: 1.2, opacity: 0, y: 120, delay: 0.3, ease: 'power2.out' })
        gsap.from('.home__mountain-2', { duration: 1.2, opacity: 0, x: 100, delay: 0.5, ease: 'power2.out' })
        gsap.from('.home__mountain-3', { duration: 1.2, opacity: 0, x: -100, delay: 0.6, ease: 'power2.out' })
        gsap.from('.home__moon', { duration: 1.4, opacity: 0, y: 150, delay: 0.7, ease: 'power2.out' })
        gsap.from('.home__trineo', { duration: 1.4, opacity: 0, x: -150, delay: 0.8, ease: 'power2.out' })
        gsap.from('.home__content', { duration: 1.2, opacity: 0, y: -40, delay: 0.9, ease: 'power2.out' })
    }
} catch (e) {
    console.warn('GSAP init notice:', e)
}

/*==================== SCROLL REVEAL ANIMATION ====================*/
try {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'top',
            distance: '50px',
            duration: 1800,
            delay: 250,
            reset: false
        })

        sr.reveal('.about__data, .celebrate__data', { origin: 'right' })
        sr.reveal('.about__img-wrapper, .celebrate__img-wrapper', { origin: 'left' })
        sr.reveal('.send__card', { interval: 150 })
        sr.reveal('.card-studio', { origin: 'bottom', delay: 300 })
        sr.reveal('.wish-item', { interval: 100 })
        sr.reveal('.wish-form-wrapper', { origin: 'bottom', delay: 200 })
        sr.reveal('.candle-experience', { origin: 'bottom', delay: 300 })
        sr.reveal('.footer')
    }
} catch (e) {
    console.warn('ScrollReveal init notice:', e)
}

/*==================== GITHUB PAGES / RESILIENT IMAGE FALLBACKS ====================*/
/* If image assets are missing on GitHub deployment, automatically provide elegant SVG illustrations */
const festiveSvgFallbacks = {
    'logo.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="treeGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2dd4bf"/><stop offset="100%" stop-color="#0f766e"/></linearGradient></defs><polygon points="50,15 62,35 55,35 68,55 60,55 75,78 25,78 40,55 32,55 45,35 38,35" fill="url(#treeGrad)"/><polygon points="50,8 53,16 61,16 55,21 57,29 50,24 43,29 45,21 39,16 47,16" fill="#fbbf24"/><rect x="46" y="78" width="8" height="12" fill="#92400e" rx="2"/><circle cx="50" cy="40" r="3" fill="#ef4444"/><circle cx="42" cy="62" r="3" fill="#fbbf24"/><circle cx="58" cy="65" r="3" fill="#38bdf8"/></svg>`,
    'favicon.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><polygon points="16,4 25,24 7,24" fill="#10b981"/><circle cx="16" cy="4" r="2.5" fill="#f59e0b"/></svg>`,
    'home-moon.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><radialGradient id="moonGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff8db"/><stop offset="50%" stop-color="#fef08a"/><stop offset="85%" stop-color="#fde047" stop-opacity="0.9"/><stop offset="100%" stop-color="#ca8a04" stop-opacity="0.2"/></radialGradient><filter id="blurHalo"><feGaussianBlur stdDeviation="15"/></filter></defs><circle cx="200" cy="200" r="140" fill="#fef08a" opacity="0.3" filter="url(#blurHalo)"/><circle cx="200" cy="200" r="110" fill="url(#moonGlow)"/><ellipse cx="170" cy="180" rx="20" ry="14" fill="#facc15" opacity="0.4"/><ellipse cx="230" cy="220" rx="28" ry="18" fill="#facc15" opacity="0.35"/><ellipse cx="190" cy="240" rx="16" ry="12" fill="#facc15" opacity="0.3"/></svg>`,
    'home-trineo-santa.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><defs><linearGradient id="santaGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ef4444"/><stop offset="100%" stop-color="#b91c1c"/></linearGradient></defs><g fill="#fde047" opacity="0.9"><circle cx="480" cy="70" r="14"/><path d="M470,70 Q495,65 510,85 Q495,100 460,95 Z"/><circle cx="360" cy="90" r="14"/><path d="M350,90 Q375,85 390,105 Q375,120 340,115 Z"/></g><path d="M120,165 Q160,195 240,165 Q270,150 250,130 Q220,120 180,135 Z" fill="url(#santaGrad)" stroke="#fbbf24" stroke-width="3"/><circle cx="190" cy="115" r="16" fill="#ef4444"/><circle cx="190" cy="110" r="8" fill="#fecaca"/><path d="M180,118 Q190,132 200,118 Z" fill="#ffffff"/><circle cx="160" cy="125" r="18" fill="#15803d"/><path d="M250,140 Q350,110 470,80" stroke="#fde047" stroke-width="2" stroke-dasharray="4,4" fill="none"/></svg>`,
    'home-mountain-3.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 300" preserveAspectRatio="none"><polygon points="0,300 0,160 180,70 340,190 520,50 690,180 850,80 1000,170 1000,300" fill="#081426" opacity="0.85"/></svg>`,
    'home-mountain-2.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 320" preserveAspectRatio="none"><polygon points="0,320 0,180 120,120 280,240 450,90 620,230 780,110 1000,210 1000,320" fill="#0c1e38"/><polygon points="450,90 410,130 490,130" fill="#e2e8f0" opacity="0.6"/><polygon points="780,110 740,145 820,145" fill="#e2e8f0" opacity="0.6"/></svg>`,
    'home-pine-tree.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 260" preserveAspectRatio="none"><g fill="#071927"><polygon points="100,260 130,120 160,260"/><polygon points="110,260 130,90 150,260"/><polygon points="250,260 285,100 320,260"/><polygon points="400,260 430,130 460,260"/><polygon points="530,260 565,80 600,260"/><polygon points="545,260 565,60 585,260"/><polygon points="700,260 730,110 760,260"/></g></svg>`,
    'home-village.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" preserveAspectRatio="none"><g fill="#071424"><rect x="120" y="200" width="100" height="90" rx="3"/><polygon points="105,200 170,130 235,200" fill="#0e233d"/><rect x="320" y="170" width="130" height="120" rx="3"/><polygon points="300,170 385,90 470,170" fill="#0e233d"/><rect x="580" y="190" width="110" height="100" rx="3"/><polygon points="565,190 635,120 705,190" fill="#0e233d"/></g><g fill="#fde047" opacity="0.85"><rect x="150" y="230" width="24" height="24" rx="2"/><rect x="350" y="210" width="28" height="28" rx="2"/><rect x="400" y="210" width="28" height="28" rx="2"/><rect x="620" y="225" width="25" height="25" rx="2"/></g></svg>`,
    'home-mountain-1.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 240" preserveAspectRatio="none"><path d="M0,240 L0,120 Q300,40 600,110 T1200,80 L1200,240 Z" fill="#060f1e"/></svg>`,
    'home-snow.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 140" preserveAspectRatio="none"><path d="M0,140 L0,50 Q200,10 450,45 T950,25 Q1100,40 1200,20 L1200,140 Z" fill="#0d1b2e"/></svg>`,
    'about-christmas.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400"><defs><linearGradient id="aboutGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ef4444"/><stop offset="100%" stop-color="#991b1b"/></linearGradient></defs><rect width="500" height="400" rx="24" fill="#091629"/><circle cx="250" cy="150" r="70" fill="url(#aboutGrad)"/><circle cx="250" cy="140" r="35" fill="#fed7aa"/><path d="M220,150 Q250,205 280,150 Z" fill="#ffffff"/><circle cx="250" cy="130" r="10" fill="#f87171"/><rect x="170" y="230" width="160" height="110" rx="16" fill="url(#aboutGrad)"/><rect x="235" y="230" width="30" height="110" fill="#fbbf24"/><rect x="170" y="270" width="160" height="30" fill="#fbbf24"/><polygon points="250,205 230,230 270,230" fill="#fbbf24"/><text x="250" y="375" text-anchor="middle" fill="#fde047" font-family="'Outfit', sans-serif" font-size="20" font-weight="600">Heartfelt Christmas Warmth</text></svg>`,
    'send-gifts.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220"><rect width="300" height="220" rx="16" fill="#091628"/><rect x="80" y="80" width="140" height="100" rx="10" fill="#dc2626"/><rect x="135" y="80" width="30" height="100" fill="#f59e0b"/><rect x="80" y="115" width="140" height="30" fill="#f59e0b"/><ellipse cx="130" cy="65" rx="20" ry="14" fill="#fbbf24"/><ellipse cx="170" cy="65" rx="20" ry="14" fill="#fbbf24"/><circle cx="150" cy="72" r="9" fill="#d97706"/></svg>`,
    'send-santa.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220"><rect width="300" height="220" rx="16" fill="#091628"/><circle cx="150" cy="80" r="45" fill="#ef4444"/><circle cx="150" cy="80" r="28" fill="#fde68a"/><path d="M125,90 Q150,135 175,90 Z" fill="#ffffff"/><circle cx="150" cy="82" r="7" fill="#ef4444"/><rect x="100" y="130" width="100" height="70" rx="12" fill="#ef4444"/><rect x="100" y="150" width="100" height="16" fill="#18181b"/><rect x="140" y="145" width="20" height="26" fill="#f59e0b" rx="3"/></svg>`,
    'send-night.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220"><rect width="300" height="220" rx="16" fill="#081324"/><circle cx="230" cy="60" r="22" fill="#fef08a" opacity="0.9"/><polygon points="60,170 120,80 180,170" fill="#0d233a"/><rect x="95" y="125" width="50" height="45" fill="#0a1726"/><rect x="110" y="135" width="18" height="18" fill="#fbbf24" rx="2"/><circle cx="70" cy="40" r="2" fill="#ffffff"/><circle cx="140" cy="30" r="2" fill="#ffffff"/><circle cx="190" cy="45" r="2" fill="#ffffff"/></svg>`,
    'celebarte-church.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400"><rect width="500" height="400" rx="24" fill="#091629"/><polygon points="250,50 180,180 320,180" fill="#0e233d"/><rect x="200" y="180" width="100" height="160" fill="#0b1a2e" rx="4"/><polygon points="120,220 200,160 200,340 120,340" fill="#081424"/><polygon points="380,220 300,160 300,340 380,340" fill="#081424"/><polygon points="250,30 254,42 266,42 256,50 260,62 250,54 240,62 244,50 234,42 246,42" fill="#fbbf24"/><path d="M230,240 Q250,210 270,240 L270,300 L230,300 Z" fill="#fbbf24" opacity="0.9"/><line x1="250" y1="220" x2="250" y2="300" stroke="#78350f" stroke-width="2"/><line x1="230" y1="260" x2="270" y2="260" stroke="#78350f" stroke-width="2"/><text x="250" y="375" text-anchor="middle" fill="#fde047" font-family="'Outfit', sans-serif" font-size="20" font-weight="600">Peaceful Holiday Sanctuary</text></svg>`,
    'snow-img.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><g stroke="#93c5fd" stroke-width="3" stroke-linecap="round"><line x1="40" y1="10" x2="40" y2="70"/><line x1="10" y1="40" x2="70" y2="40"/><line x1="18" y1="18" x2="62" y2="62"/><line x1="18" y1="62" x2="62" y2="18"/></g><circle cx="40" cy="40" r="4" fill="#dbeafe"/></svg>`
}

function handleImageError(img) {
    const src = img.getAttribute('src') || ''
    const filename = src.split('/').pop().split('?')[0]
    
    if (festiveSvgFallbacks[filename]) {
        console.warn(`[Christmas Magic] Notice: Image "${filename}" failed to load from "${src}". Deploying festive vector illustration fallback. (Tip: Ensure assets/img/ is pushed to GitHub!)`)
        const svgContent = encodeURIComponent(festiveSvgFallbacks[filename])
        img.src = `data:image/svg+xml;utf8,${svgContent}`
        img.classList.add('loaded-fallback')
    }
}

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => handleImageError(img))
    // If already broken before script attaches
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) {
        handleImageError(img)
    }
})

