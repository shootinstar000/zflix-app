import Link from "next/link";
import Image from "next/image";
import styles from '../../scss/components/poster.module.scss';
import { motion } from "framer-motion";

function Poster({ item, type }) {
  const getYear = (date) => {
    return date?.slice(0, 4);
  };
  const removeSpecialCharacters = (title) => {
    return title.replace(/[&#,+()$~%'.":!*?<>{}]/g, "");
  };

  const covertToLinkWords = (title) => {
    var s = removeSpecialCharacters(title);
    return s.replace(/\s+/g, "-").toLowerCase();
  };

  const getHref=()=>{
    if (type === "movie") {
      return (
        "/en/movie/[id]/[name]")
      }
      else
      return (
        "/en/tv/[id]/[name]")
  }

  const getLink = () => {
    if (type === "movie") {
      return (
        "/en/movie/" +
        item.id +
        "/" +
        covertToLinkWords(item.title ) +
       ( item.release_date?("-" +
        getYear(item.release_date)):"")
      );
    } else if(type==="tv")
      return (
        "/en/tv/" +
        item.id +
        "/" +
        covertToLinkWords(item.name) +
        ( item.first_air_date?("-" +
        getYear(item.first_air_date)):"")
      );
      else{
        return (
          "/en/person/" +
          item.id +
          "/" +
          covertToLinkWords(item.name)
        )
      }
  };
  function MoviePosterInfo({item}) {
    
    return(
      <div className={styles.poster_info}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.overview}>{getYear(item.release_date)}</p>
          <p className={styles.overview}>{item.overview}</p>
          {
            (new Date())>(new Date(item.release_date))?          
              <Link href={getLink()+"/watch"}>
                <div className={styles.watch_now}>
                  <i className="bi bi-play-fill"></i>
                  Watch Now
                </div>
              </Link>
            :
            null
          }
      </div>
    )
  }
  function TvPosterInfo({item}) {
    
    return(
      <div className={styles.poster_info}>
          <p className={styles.title}>{item.name}</p>
          <p className={styles.overview}>{getYear(item.first_air_date)}</p>
          <p className={styles.overview}>{item.overview}</p>
          {
            (new Date())>(new Date(item.first_air_date))?          
              <Link href={getLink()+"/season/1/episode/1"}>
                <div className={styles.watch_now}>
                  <i className="bi bi-play-fill"></i>
                  Watch Now
                </div>
              </Link>
            :
            null
          }
      </div>
    )
  }
  function PersonPosterInfo({item}) {
    return(
      <div className={styles.poster_info}>
          <p className={styles.title}>{item.name}</p>
          <p className={styles.overview}>{item.known_for_department}</p>
          <p className={styles.overview}>{item.overview}</p>
          {
            (new Date())>(new Date(item.first_air_date))?          
              <Link href={getLink()+"/season/1/episode/1"}>
                <a>
                  <div className={styles.watch_now}>
                    <i className="bi bi-play-fill"></i>
                    Watch Now
                  </div>
                </a>
              </Link>
            :
            null
          }
      </div>
    )
  }
  return (
    <>
      <Link href={getLink()} passHref> 
        <a className={styles.poster_link} >
        <motion.div 
          // whileTap={{ scale: 0.9 }}
          whileHover={{scale:1.075}}
        > 
          <div className={styles.poster_container}>
            <Image
              src={"https://image.tmdb.org/t/p/w780" + (type==="movie"|| type==="tv"?item.poster_path:item.profile_path)}
              layout="fill"
              placeholder="blur"
              objectFit="cover"
              blurDataURL={"https://image.tmdb.org/t/p/w780" + (type==="movie"|| type==="tv"?item.poster_path:item.profile_path)}
              alt={(type==="movie"?item.title:item.name)}
            />
            {type==="movie"?<MoviePosterInfo item={item} />:(type==="tv"?<TvPosterInfo item={item} />:<PersonPosterInfo item={item} />)}
          </div>
        </motion.div>
        </a>
      </Link>
    </>
  );
}


export default Poster;
