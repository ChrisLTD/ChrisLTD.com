---
layout: post
title: Hello, world 
---
Sometimes you need repeatable content fields[^acf] like these promos:

![Promos](images/2013/10/d7-field-collection-promos.png)

Made up of a collection of fields
Wouldn't want to make cck fields for each promo. You might want one or 10, who knows

The solution is to use the [Field Collection module](https://drupal.org/project/field_collection). First you add a field collection to your content type (with the option to limit or not limit the number of collections you can attach to the node):

![Creating field collection](images/2013/10/d7-field-collection-creation.png)

![Setting up unlimited collections](images/2013/10/d7-field-collection-unlimited.png)

Then in the Field Collections module, you define fields to be part of that collection just like you would add CCK field to a node type:

![Adding fields to a collection](images/2013/10/d7-field-collection-field.png)

Afterwards, you should have a nice clean and logical way to add new collection items to your nodes:

![Form for adding new promos](images/2013/10/d7-field-collection-entry.png)

The big trick is getting data out of your collections. To help I wrote this PHP function that returns a clean array you can work with:

{% highlight php %}
/*
*  Returns array of single level Field Collection data
*
*  Modified from: https://drupal.org/node/1155752#comment-7379610
*  Params: $node = set to the current $node
*               $field_collection_name = string name of the field collection field
*               $field_names_array = array of field name strings
*/
function get_field_collection_array($field_collection_name, $field_names_array) {
  // Get node object if possible
  $node = menu_get_object();
  if(!$node){
    return null;
  }

  $field_data_array = array();

  $field_collection = field_get_items('node', $node, $field_collection_name);
  if( empty($field_collection)) {
    return null;
  }

  foreach($field_collection as $field_collection_set){
    $field = field_view_value('node',$node, $field_collection_name, $field_collection_set);
    foreach ($field['entity']['field_collection_item'] as $id => $field_collection){
      // load the field collection item entity
      $field_collection_item = field_collection_item_load($id);
      // wrap the entity and make it easier to get the values of fields
      $field_wrapper = entity_metadata_wrapper('field_collection_item', $field_collection_item);
      // all values from a field collection
      $new_item = array();
      foreach($field_names_array as $name){
        $new_item[$name] = $field_wrapper->$name->value();
      }
      $field_data_array[] = $new_item;
    }
  }

  return $field_data_array;
}
{% endhighlight %}

Calling the function like this:

{% highlight php %}
get_field_collection_array("field_promos", array('field_title', 'field_url', 'field_short_description') );
{% endhighlight %}

Will return an array you can then loop through yourself and output however you'd like:

{% highlight text %}
Array
(
    [0] => Array
        (
            [field_title] => Promo 1
            [field_url] => http://nytimes.com
            [field_short_description] => Lorem ipsum dolor sit amet
        )

    [1] => Array
        (
            [field_title] => Promo 2
            [field_url] => http://wsj.com
            [field_short_description] => Dolor sit amet
        )

)
{% endhighlight %}


[^acf]: Wordpress has an awesome payware plugin for this called [Advanced Custom Fields](http://www.advancedcustomfields.com/) [repeater](http://www.advancedcustomfields.com/add-ons/repeater-field/) field