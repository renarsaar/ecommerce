import React from 'react';

export default function Fabric() {
  return (
    <div className="fabric">
      <div className="fabric-article fabric-img">
        <div>
          <h1 className="mb-1 mt-2">Fabrics 101: How we Choose the Right Fabric for Our Project</h1>

          <p className="mb-3">
            VRA also provides customers the ability to choose our custom tailored clothing.
            We think it’s so important to have clothes that fit well
            and make a statement about who you are.

            Choosing the right fabric when creating a new project
            is one of the most important steps we take.
            If we make the wrong choice, this can greatly affect our finished product.

            In making the correct choice,
            we are moved either by the fabric’s texture or design.
            Finding a happy medium between the two is sewing heaven, indeed!

            For those who do not have a lot of time to research the different fabric types,
            this infographic from Blinds.com is a quick cheat sheet on what you need to know.
            Learn all about fabrics to help you
            pick the right material for sewing garments or textile projects.
          </p>
        </div>

        <div className="fabric-image-container">
          <img className="img-back" src="https://images.unsplash.com/photo-1598008059006-eb85defaa105?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=740&q=80" alt="fabrics" />

          <img className="img-front" src="https://images.unsplash.com/photo-1545042746-ec9e5a59b359?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="fabrics" />
        </div>
      </div>

      <div className="fabric-article">
        <h3 className="mb-1">Why do we put so much effort in custom clothing?</h3>
        <p>
          Nothing beats the look of custom crafted clothing.
          Patterns we make ourselves will show off unique style and personality
          and let You stand out from the crowd.
        </p>
      </div>
    </div>
  );
}
