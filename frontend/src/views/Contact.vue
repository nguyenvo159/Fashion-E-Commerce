<template>
    <div class="container-fluid row justify-content-center">
        <div class="col-lg-10 col-11 mb-5">
          <h1 class="text-center mt-3">Contact Us</h1>
          <p class="text-center text-muted">Liên hệ với chúng tôi nếu bạn có bất kì thắc mắc hay trải nghiệm không tốt nào về
            chúng tôi</p>
          <div class="row mt-5 ">
            <div class="col-lg-6 col-12 d-none d-lg-flex justify-content-center">
                <img class="img-fluid w-75" src="https://preview.colorlib.com/theme/bootstrap/contact-form-16/images/undraw-contact.svg" alt="">
            </div>
            <div class="col-lg-6 col-12 pt-4 mb-5">
              <form action="">
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text bg-white">
                        <i class="fa fa-user"></i>&nbsp
                      </span>
                    </div>
                    <input name="name" type="name" placeholder="Name" class="form-control border-left-0" required>
                  </div>
                </div>
      
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text bg-white">
                        <i class="fa fa-envelope"></i>
                      </span>
                    </div>
                    <input name="email" type="email" placeholder="Email" class="form-control border-left-0" required>
                  </div>
                </div>
      
                <div class="form-group">
                  <textarea class="form-control" id="message" rows="5" placeholder="Enter message" required></textarea>
                </div>
      
                <button type="submit" class="btn btn-primary float-right">
                  <i class="fa fa-paper-plane"></i>
                  Send
                </button>
              </form>
            </div>
      
          </div>
        </div>
      </div>
</template>