// Sesta owner quote — slice 02/03.
// Italic pull-quote on the right column, attribution below.

export default function OwnerQuoteSection() {
  return (
    <section className="sesta-quote">
      <div className="sesta-quote__inner">
        <blockquote className="sesta-quote__body">
          &ldquo;The atmosphere of the ancient house, the vastness and the endless light on the
          fields, the warm, salty sea air, the family togetherness, this is Ses Talaioles.&rdquo;
          <footer className="sesta-quote__attribution">
            <span className="name">Frans de Wodt</span>
            Finca Ses Talaioles
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
