import React from 'react';
import ReactDOM from 'react-dom';

export default function ProductCare({ showProductCare, handleClose }) {
  const modalClassName = showProductCare === true ? 'modal-container visible' : 'modal-container hidden';

  return ReactDOM.createPortal(
    <div className={modalClassName} onClick={handleClose}>
      <div className="modal-main" onClick={(e) => e.stopPropagation()}>
        <div className="close-modal">
          <button type="button" onClick={handleClose}>
            X
          </button>
        </div>

        <div className="care-guide">
          <h1 className="headline">Care Guide</h1>
          <div className="line" />

          <p>
            In order to extend the life-cycle of your garments, it is crucial you take good care of them. And because as a brand, we see ourselves accountable for the garments we produce, we have created a care guide for you to guide you towards a more gentle, sustainable and enjoyable garment care experience.
          </p>

          <div className="care-container">
            <div className="care-container-info">
              <h2>Wash Less, Wear More</h2>
              <div className="line" />

              <p className="mt-2">
                Always keep in mind that it’s best to wash your clothes as little as possible. Washing your clothes too often can have a negative impact on their quality while putting pressure on both the environment and your wallet. Instead of washing your garments after each use, try airing and shaking them out properly, which will most often be enough for your clothes to be good for another wear. Try to also make it a habit to spot clean stains immediately instead of using the washing machine.
              </p>
            </div>

            <img src="https://cdn.shopify.com/s/files/1/2450/4301/files/sustainability_1_800x.jpg?v=1625482115" alt="Wash less" />
          </div>

          <div className="care-container">
            <img src="https://store-media.mpowerpromo.com/5c7edfd8208c866f6f7c7fd0/pages/5ff5f9712476285b4e26d0c2/Blog-Banner-1610043676796.png" alt="Wash less" />

            <div className="care-container-info">
              <h2>Choose Eco-Friendly Products</h2>
              <div className="line" />

              <p className="mt-2">
                To protect both your garments and the environment, opt for eco-friendly laundry products and avoid bleach and softeners. Eco-friendly detergents are just as effective as their conventional counterparts but come with the benefit of being free from harmful chemicals and toxins. Bleach can be damaging to fabrics, while softeners cover your garments in a thin film that can impede positive attributes such as breathability and moisture absorbency.
              </p>
            </div>
          </div>

          <div className="care-container">
            <div className="care-container-info">
              <h2>Wash Mindfully</h2>
              <div className="line" />

              <p className="mt-2">
                Always pay attention to the individual care labels inside your garments but aim to wash your clothing at low temperatures (max. 30°C) or cold. Make sure to always fill your washing machine to avoid wasting water and energy but don’t overfill as heavy loads can cause friction and result in poorly washed or worn-out garments. Don’t forget to also sort your clothes according to their care requirements. Separate light from darker colors, while being mindful of different fabrics.
              </p>
            </div>

            <img src="https://imgix.bustle.com/uploads/image/2020/5/18/bfa470cc-6faf-4916-be8c-164e4e18a23c-shutterstock_1507572833.jpg?w=760&h=507&fit=crop&crop=faces&auto=format%2Ccompress&q=50&dpr=2" alt="Wash Mindfully" />
          </div>

          <div className="care-container">
            <img src="https://tipsmake.com/data/images/how-to-dry-clothes-in-a-humid-climate-picture-3-jQi3ZZydF.jpg" alt="Dry Garments Naturally" />

            <div className="care-container-info">
              <h2>Dry Garments Naturally</h2>
              <div className="line" />

              <p className="mt-2">
                One of the most significant choices for both your garments and the environment is to skip the dryer and instead choose to air-dry your garments naturally. Always remove your damp clothes from the washing machine as soon as possible to avoid wrinkles, mold and mildew. Shake them out carefully, gently pull them into shape (especially jersey fabrics) and hang them on a drying rack or on a hanger. Drying knitwear is a little trickier.
              </p>
            </div>
          </div>

          <div className="guide">
            <h1>Stain Guide</h1>
            <div className="line" />

            <ul>
              <li>
                Always aim to treat stains on clothing pieces immediately; the sooner, the better. Natural materials such as cotton, linen, and wool generally tend to be very absorbent, which means that the longer you wait before treating a stain, the harder it will be to get rid of it.
              </li>
              <li>
                Unfortunately, there’s no universal treatment for stains, so make sure to always read up on the best way to treat your particular stain and garment. However, there are a few things to keep in mind for both fresh and set stains:
              </li>
              <li>
                → <b>Choose the right water temperature.</b> Hot or warm water is not always the best solution, as it can actually set some stains, making them even harder to eliminate. Hot or warm water is recommended for fatty stains only. Stains from coffee, blood, chocolate, ketchup, grass, fruit, berries, and red wine should be rinsed with cold water instead.
              </li>
              <li>
                → <b>Use gentle detergents.</b> If water alone does not work, add some eco-friendly laundry detergent, but remember that some garments such as those made from wool and TENCEL™ should not be rubbed or scrubbed, but instead, gently dabbed using a clean cloth.
              </li>
              <li>
                → <b>Avoid using harsh stain removers or bleach,</b> as these can damage the fabric surface of your garments. If treating your steps with water and detergent is not enough, try to repeat the process a few times. If a stain is severe or you are afraid of ruining the garment, it’s a good idea to err on the side of caution and take it to a cleaner.
              </li>
            </ul>
          </div>

          <div className="guide">
            <h1>Storage</h1>
            <div className="line" />

            <ul>
              <li>
                You might not be aware of it, but your clothes can actually get damaged while you’re not even wearing them. Crowded closets are a common issue, as clothes can easily get tangled, wrinkled, or snagged. Therefore, make sure you don’t overfill your closet and always store your clothes correctly; a few simple rules can make your life easier and your clothes last longer.
              </li>
              <li>
                → <b>Hang sturdy fabrics.</b> Use hangers to hang sturdy clothes such as pants and shirts that are not stretchy. Always pay attention to placing your clothes on the hangers the way you would like them to sit on your body, and close any zippers and buttons, as this will help maintain the quality and fit of your clothes.
              </li>
              <li>
                → <b>Fold stretchy fabrics.</b> Clothes made from stretchy fabrics can easily lose their shape if they’re placed on hangers. Therefore, they should be folded and stored in the drawers or shelves of your closet. However, avoid stacking too many items on top of each other, as this can cause wrinkles. When hanging T-shirts, always insert and take out the hangers through the bottom and never through the collar to avoid stretching and damage.
              </li>
              <li>
                → <b>Protect your clothes from moths.</b> Unfortunately, natural materials such as wool can sometimes attract moths, so it’s important that you always store your clothes in a dry and clean state. Dried cedar or lavender can also help protect your garments from moths. Gently shaking out your clothes from time to time can also keep moths away.
              </li>
              <li>
                → <b>Storing seasonal clothes.</b> If you plan to pack some of your clothes away throughout the seasons, also make sure they are completely dry and clean to avoid unwanted mold, mildew, and stains. Place your neatly folded garments in boxes and store them in a cool, dry, and well-ventilated space. Use dried cedar or lavender to protect your clothes from moths.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('product-care'),
  );
}
