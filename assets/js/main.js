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
        initSnowflakes()
    })
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
