Books = new Meteor.Collection("books");

if (Meteor.isClient) {
  Meteor.subscribe("Book-counts");
  counts = new Meteor.Collection("counts");

  Template.home.countBooks = function () {
    c = counts.findOne();
    if(c)
      return c
  };

  Template.home.events({
    'click input' : function () {
      Books.insert({name:"a new book"});
    }
  });
}

if (Meteor.isServer) {
    Meteor.publish("books",function(){
      return Books.find();
    });
    Meteor.publish("Book-counts", function() {
      var handle, self, initializing;
      self = this;
      var uuid = Meteor.uuid();
      initializing = true;
      var obj = {count:0};
      var countsVar = 0;
      
      handle = Books.find().observeChanges({
        added: function(idx, doc){
          countsVar++;
          obj.count++;
          if (!initializing)
            self.changed("counts", uuid, {countsObj:obj,countsVar:countsVar});
        },
        removed: function(idx,doc){
          obj.count--;
          countsVar --
          self.changed("counts", uuid, {countsObj:obj,countsVar:countsVar}) ;
        }
      });

      initializing = false;
      self.added("counts", uuid, {countsObj:obj,countsVar:countsVar});
      self.ready();
      self.onStop(function(){
        handle.stop();
      });
    });
}
