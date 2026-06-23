// A minimal browser chrome wrapper. Frames a web-app screenshot so a tall
// dashboard reads as an intentional viewport instead of a cropped image.
export default function BrowserFrame({ url = 'compoundbanc.com', children }) {
  return (
    <div className="browser">
      <div className="browser-bar">
        <span className="bd" /><span className="bd" /><span className="bd" />
        <span className="browser-url">{url}</span>
      </div>
      <div className="browser-view">{children}</div>
    </div>
  )
}
