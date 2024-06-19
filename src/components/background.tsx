
type Props = {}

const Background = (props: Props) => {
  return (
    <div className="fixed left-0 right-0 w-full h-screen -z-10">
        <svg
          // className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 1280 1280"
          opacity="1"
          width="1280px"
          height="1280px"
        >
          <defs>
            <radialGradient id="ffflux-gradient">
              <stop offset="0%" stop-color="hsl(212, 67%, 42%)"></stop>
              <stop offset="100%" stop-color="hsl(0, 0%, 100%)"></stop>
            </radialGradient>
            <filter
              id="ffflux-filter"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.003 0.003"
                numOctaves="2"
                seed="237"
                stitchTiles="stitch"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                result="turbulence"
              ></feTurbulence>
              <feGaussianBlur
                stdDeviation="67 62"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="turbulence"
                edgeMode="duplicate"
                result="blur"
              ></feGaussianBlur>
              <feBlend
                mode="color-dodge"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="SourceGraphic"
                in2="blur"
                result="blend"
              ></feBlend>
            </filter>
          </defs>
          <rect
            width="1280"
            height="1280"
            fill="url(#ffflux-gradient)"
            filter="url(#ffflux-filter)"
          ></rect>
        </svg>
      </div>
  )
}

export default Background