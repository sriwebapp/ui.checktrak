<template>
  <v-container fluid fill-height class="corner">
    <v-layout align-center justify-center>
      <p style="font-size: 60px">
        <span class="fixed-text">Check </span>
        <span class="typed-text"></span>
        <span class="cursor">&nbsp;</span>
      </p>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    textArray: [
      'monitoring',
      'automation',
      'transaction',
      'management',
      'tracking'
    ],
    typingDelay: 200,
    erasingDelay: 100,
    newTextDelay: 2000,
    textArrayIndex: 0,
    charIndex: 0
  }),
  methods: {
    type() {
      const typedTextSpan = document.querySelector('.typed-text')
      const cursorSpan = document.querySelector('.cursor')

      if (!typedTextSpan) return

      if (this.charIndex < this.textArray[this.textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing'))
          cursorSpan.classList.add('typing')
        typedTextSpan.textContent += this.textArray[this.textArrayIndex].charAt(
          this.charIndex
        )
        this.charIndex++
        setTimeout(this.type, this.typingDelay)
      } else {
        cursorSpan.classList.remove('typing')
        setTimeout(this.erase, this.newTextDelay)
      }
    },
    erase() {
      const typedTextSpan = document.querySelector('.typed-text')
      const cursorSpan = document.querySelector('.cursor')

      if (!typedTextSpan) return

      if (this.charIndex > 0) {
        if (!cursorSpan.classList.contains('typing'))
          cursorSpan.classList.add('typing')
        typedTextSpan.textContent = this.textArray[
          this.textArrayIndex
        ].substring(0, this.charIndex - 1)
        this.charIndex--
        setTimeout(this.erase, this.erasingDelay)
      } else {
        cursorSpan.classList.remove('typing')
        this.textArrayIndex = Math.floor(Math.random() * this.textArray.length)
        setTimeout(this.type, this.typingDelay + 1100)
      }
    }
  },
  mounted() {
    if (this.textArray.length) setTimeout(this.type, this.newTextDelay + 250)
  }
}
</script>

<style>
.corner {
  background: url('./../assets/Corner.png') no-repeat bottom right;
}
.container p span.fixed-text {
  font-weight: 450;
  color: #333;
}
.container p span.typed-text {
  font-weight: normal;
  color: #dd7732;
}
.container p span.cursor {
  display: inline-block;
  background-color: #555;
  margin-left: 0.1rem;
  width: 3px;
  animation: blink 1s infinite;
}
.container p span.cursor.typing {
  animation: none;
}
@keyframes blink {
  0% {
    background-color: #555;
  }
  49% {
    background-color: #555;
  }
  50% {
    background-color: transparent;
  }
  99% {
    background-color: transparent;
  }
  100% {
    background-color: #555;
  }
}
</style>
