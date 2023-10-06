using System.Collections.Generic;
using System.Threading.Tasks;
using System.Xml.Linq;
using CodeHollow.FeedReader;
using LazyNews.Models;
using Microsoft.AspNetCore.Mvc;

namespace ShortNews.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RSSController : ControllerBase
    {

        [HttpGet("fetch-rss/toppsaker")]
        public async Task<IActionResult> FetchRss()
        {
            var feed = await FeedReader.ReadAsync("https://www.nrk.no/toppsaker.rss");
            var rssItems = new List<RssItem>();

            var media = XNamespace.Get("http://search.yahoo.com/mrss/");

            foreach (var item in feed.Items)
            {
                var rssItem = new RssItem
                {
                    Title = item.Title,
                    Link = item.Link,
                    Description = item.Description,
                    PubDate = item.PublishingDate?.ToString("R"),
                };

                var imageElement = item.SpecificItem.Element.Descendants(media + "content").FirstOrDefault();
                if (imageElement != null)
                {
                    rssItem.ImageUrl = imageElement.Attribute("url")?.Value;
                }

                rssItems.Add(rssItem);
            }

            return Ok(rssItems);
        }


    }
    



}