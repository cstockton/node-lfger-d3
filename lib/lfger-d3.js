(function() {
  var lfgerd3 = {};

  var _util = lfgerd3.util = (function() {
    var _empty = {};

    function Util() {};

    Util.prototype.normalize = function(arg) {
      if(typeof arg !== 'string') {
        arg = new String(arg);
      }

      return arg.toLowerCase().trim();
    };
    
    Util.prototype.has = function(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    };
    
    Util.prototype.keys = Object.keys || function(obj) {
      var keys = [];

      for (var key in obj) {
        if (this.has(obj, key)) {
          keys[keys.length] = key;
        }
      }
      for (var i = 0, l = obj.length; i < l; i++) {
        if (_empty === iterator.call(context, obj[i], i, obj)) {
          return;
        }
      }

      return keys;
    };

    Util.prototype.each = function(obj, iterator, context) {
      if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
        return obj.forEach(iterator, context);
      }
      
      if (typeof obj.length === 'number') {
        for (var i = 0, l = obj.length; i < l; i++) {
          if (_empty === iterator.call(context, obj[i], i, obj)) {
            return;
          }
        }
      } else {
        for(var key in obj) {
          if (this.has(obj, key)) {
            if (_empty === iterator.call(context, obj[key], key, obj)) {
              return;
            }
          }
        }
      }
    };

    Util.prototype.map = function(obj, iterator, context) {
      var results = [];

      if (Array.prototype.map && Array.prototype.map === obj.map) {
        return obj.map(iterator, context);
      }

      this.each(obj, function(value, index, list) {
        results[results.length] = iterator.call(context, value, index, list);
      });

      return results;
    };
    
    Util.prototype.values = function(obj) {
      var results = [];
      
      this.each(obj, function(value, index) {
        results[results.length] = value;
      });

      return results;
    };
    
    Util.prototype.every = function(obj, iterator, context) {
      var result = true;

      if (Array.prototype.every && Array.prototype.every === obj.every) {
        return obj.every(iterator, context);
      }

      this.each(obj, function(value, index, list) {
        if(!result) {
          return _empty;
        }

        result = iterator.call(context, value, index, list);
      });

      return !!result;
    };

    Util.prototype.queue = function(tasks, done, concurrency) {
      var pending = tasks.length;
      var executing = 0;
      concurrency = concurrency || 9999999;

      var executor = function(executorDone) {
        var next = function() {
          executing--;
          pending--;

          (pending === 0) ? done() : executor();
        };

        while(0 < tasks.length && executing < concurrency) {
          executing++;
 
          (tasks.shift())(next);
        }
      };

      return executor(done);

    };
        
    Util.prototype.cloneFactory = function(obj) {
      return function() {
        return _util.values(obj).slice(0);
      }
    };
   
    Util.prototype.cloneFactoryKeys = function(obj) {
      return function() {
        return _util.keys(obj).slice(0);
      }
    };
   
    Util.prototype.inFactory = function(obj) {
      var _util = this;

      return function(subject) {
        var _subject = _util.normalize(subject);
        var _normalizedObj = _util.map(obj, _util.normalize);

        return !!~_normalizedObj.indexOf(_subject) || obj[subject];
      }
    };
    
    Util.prototype.accessGenerator = function(proto) {

      // build get/is method for each mod
      _util.map(proto, function(obj, key) {
        var getProto = 'get' + key.replace(/(?:^|\s)\w/g, function(match) {
          return match.toUpperCase();
        });
        var getProtoKeys = getProto + 'Keys';
        var isProto = 'is' + getProto.replace('Classes', 'Classs').replace('Qualities', 'Qualityy').slice(3, -1);
      
        proto[getProto] = _util.cloneFactory(proto[key]);
        proto[getProtoKeys] = _util.cloneFactoryKeys(proto[key]);
        proto[isProto] = _util.inFactory(proto[key]);
      });

      return function(subject) {
        var _subject = _util.normalize(subject);
        var _normalizedObj = _util.map(obj, _util.normalize);

        return !!~_normalizedObj.indexOf(_subject) || obj[subject];
      }
    };

    Util.prototype.log = function() {
      if(typeof window != 'undefined' && window.console && window.console.log) {
        Function.apply.call(console.log, console, arguments);
      }
      if(typeof console != 'undefined' && console.log) {
        Function.apply.call(console.log, console, arguments);
      }
    };

    return new Util();

  })();

  var _lang = lfgerd3.lang = (function() {
    function Lang() {};

    var _dict = {};

    // @TODO implement - lazy load the various locales
    _dict['en_US'] = {};

    // @TODO implement
    Lang.prototype.translate = function (key) {
      return key;
    };

    return new Lang();

  })();
  
  var _db = lfgerd3.db = (function() {
    function Db() {};

    Db.prototype.locales = {
      EN: 'en',
      ES: 'es',
      PT: 'pt',
      IT: 'it',
      DE: 'de',
      FR: 'fr',
      PL: 'pl',
      RU: 'ru',
      TR: 'tr',
      KO: 'ko',
      ZH: 'zh'
    };

    Db.prototype.regions = {
      CN: 'cn',
      EU: 'eu',
      KR: 'kr',
      TW: 'tw',
      US: 'us'
    };

    Db.prototype.genders = {
      FEMALE: 'Female',
      MALE: 'Male'
    };
    
    Db.prototype.classes = {
      BARBARIAN: 'Barbarian',
      DEMON_HUNTER: 'Demon Hunter',
      MONK: 'Monk',
      WITCH_DOCTOR: 'Witch Doctor',
      WIZARD: 'Wizard'
    };
    
    Db.prototype.followers = {
      ENCHANTRESS: 'Enchantress',
      TEMPLAR: 'Templar',
      SCOUNDREL: 'Scoundrel'
    };

    Db.prototype.artisans = {
      BLACKSMITH: 'Blacksmith',
      JEWELER: 'Jeweler'
    };
    
    Db.prototype.damageTypes = {
      ARCANE: 'Arcane',
      COLD: 'Cold',
      FIRE: 'Fire',
      HOLY: 'Holy',
      LIGHTNING: 'Lightning',
      PHYSICAL: 'Physical',
      POISON: 'Poison'
    };

    Db.prototype.itemQualities = {
      INFERIOR: 'Inferior',
      COMMON: 'Common',
      MAGIC: 'Magic',
      RARE: 'Rare',
      LEGENDARY: 'Legendary',
      SET: 'Set'
    };

    Db.prototype.itemWeaponTypes = {
      AXE: 'Axe',
      BOW: 'Bow',
      CEREMONIAL_KNIFE: 'Ceremonial Knife',
      CROSSBOW: 'Crossbow',
      DAGGER: 'Dagger',
      DAIBO: 'Daibo',
      FIST_WEAPON: 'Fist Weapon',
      HAND_CROSSBOW: 'Hand Crossbow',
      MACE: 'Mace',
      MIGHT_WEAPON: 'Mighty Weapon',
      POLEARM: 'Polearm',
      SPEAR: 'Spear',
      STAFF: 'Staff',
      SWORD: 'Sword',
      TWO_HANDED_AXE: 'Two-Handed Axe',
      TWO_HANDED_MACE: 'Two-Handed Mace',
      TWO_HANDED_MIGHTY_WEAPON: 'Two-Handed Mighty Weapon',
      TWO_HANDED_SWORD: 'Two-Handed Sword',
      WAND: 'Wand'
    };

    Db.prototype.itemCommonTypes = {
      AMULET: 'Amulet',
      BELT: 'Belt',
      BOOTS: 'Boots',
      BRACERS: 'Bracers',
      CHEST_ARMOR: 'Chest Armor',
      CLOAK: 'Cloak',
      GLOVES: 'Gloves',
      HELM: 'Helm',
      MIGHTY_BELT: 'Mighty Belt',
      PANTS: 'Pants',
      RING: 'Ring',
      SHIELD: 'Shield',
      SHOULDERS: 'Shoulders',
      SPIRIT_STONE: 'Spirit Stone',
      VOODOO_MASK: 'Voodoo Mask',
      WIZARD_HAT: 'Wizard Hat'
    };

    Db.prototype.itemFollowerTypes = {
      ENCHANTRESS_FOCUS: 'Enchantress Focus',
      SCOUNDREL_TOKEN: 'Scoundrel Token',
      TEMPLAR_RELIC: 'Templar Relic'
    };

    Db.prototype.itemOffHandTypes = {
      QUIVER: 'Quiver',
      MOJO: 'Mojo',
      SOURCE: 'Source'
    };

    Db.prototype.damageTypes = {
      PHYSICAL: 'Physical',
      ARCANE: 'Arcane',
      COLD: 'Cold',
      FIRE: 'Fire',
      HOLY: 'Holy',
      LIGHTNING: 'Lightning',
      POISON: 'Poison'
    };

    Db.prototype.mods = {
      // @TODO implement
      // This list is big, according to http://d3inferno.com/mpq/stl/AttributeDescriptions.stl.html
      // lets look into some lazy loading of it in the future and put it on hold
    };

    var classesData = {};
    classesData[Db.prototype.classes.BARBARIAN] = { primaryAttribute: 'strength' };
    classesData[Db.prototype.classes.DEMON_HUNTER] = { primaryAttribute: 'dexterity' };
    classesData[Db.prototype.classes.MONK] = { primaryAttribute: 'dexterity' };
    classesData[Db.prototype.classes.WITCH_DOCTOR] = { primaryAttribute: 'intelligence' };
    classesData[Db.prototype.classes.WIZARD] = { primaryAttribute: 'intelligence' };

    Db.prototype.classesData = classesData;

    // build access methods for each mod
    _util.accessGenerator(Db.prototype);

    return new Db();

  })();
  
  var _calc = lfgerd3.calc = (function() {
    function Calc() {};

    // @TODO implement
    Calc.prototype.dps = function (key) {
      return key;
    };

    return new Calc();

  })();

  var _bnet = lfgerd3.bnet = (function() {

    function Bnet() {};
    
    Bnet.prototype.hostnames = {
      CN: 'www.battlenet.com.cn',
      EU: 'eu.battle.net',
      KR: 'kr.battle.net',
      TW: 'tw.battle.net',
      US: 'us.battle.net'
    };
    
    Bnet.prototype.urls = {

      // api endpoints
      ARTISAN: 'http://{hostname}/api/d3/data/artisan/',
      ARTISAN_DETAIL: 'http://{hostname}/api/d3/data/artisan/{artisan}',
      FOLLOWER: 'http://{hostname}/api/d3/data/follower/',
      FOLLOWER_DETAIL: 'http://{hostname}/api/d3/data/follower/{follower}',
      ITEM: 'http://{hostname}/api/d3/data/item/{item}',
      PROFILE: 'http://{hostname}/api/d3/profile/{tag}/',
      PROFILE_HERO: 'http://{hostname}/api/d3/profile/{tag}/hero/{hero}',

      // icons
      ITEM_ICON: 'http://media.blizzard.com/d3/icons/items/{size}/{slug}.png',
      SKILL_ICON: 'http://media.blizzard.com/d3/icons/skills/{size}/{slug}.png',

    };
    
    Bnet.prototype.itemIconSizes = {
      SMALL: 'small',
      LARGE: 'large'
    };

    Bnet.prototype.skillIconSizes = {
      SMALL: 42,
      LARGE: 64
    };

    // build access methods
    _util.accessGenerator(Bnet.prototype);
    
    Bnet.prototype.connector = function() {
      throw new "Must implement or set a connector";
    };
    
    Bnet.prototype.tagToUrl = function(arg) {
      if(typeof arg !== 'string') {
        return false;
      }

      return arg.replace('#', '-');
    };
    
    Bnet.prototype.urlToTag = function(arg) {
      if(typeof arg !== 'string') {
        return false;
      }

      return arg.replace('-', '#');
    };
    
    Bnet.prototype.fromSluggable = function(arg) {
      if(typeof arg !== 'string') {
        return false;
      }

      return this.toSluggable(arg).replace('-',' ').replace(/\w\S*/g, function(word) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      });
    };

    Bnet.prototype.toSluggable = function(arg) {
      if(typeof arg !== 'string') {
        return false;
      }

      return _util.normalize(arg).replace(' ', '-');
    };

    Bnet.prototype.isSlug = function(slug) {
      return typeof slug === 'string' ? true : false;
    };
    
    Bnet.prototype.getGender = function(arg) {
      if(typeof arg === 'string') {
        return arg;
      }

      return 0 === arg ? _db.genders.MALE : _db.genders.FEMALE;
    };

    Bnet.prototype.parseUrl = function(url, args) {
      if(false === args) {
        return url;
      }
      
      _util.each([args, lfgerd3.defaults], function(subject) {
        if(subject) {
          _util.each(subject, function(replacement, search) {
            url = url.replace("{" + search + "}", replacement);
          });
        }
      });
      
      return url;
    };
    
    Bnet.prototype.getArtisanUrl = function() {
      return this.parseUrl(this.urls.ARTISAN);
    };
    
    Bnet.prototype.getArtisanDetailUrl = function(artisan) {
      return this.parseUrl(this.urls.ARTISAN_DETAIL, {
        artisan: _util.normalize(artisan)
      });
    };
    
    Bnet.prototype.getFollowerUrl = function() {
      return this.parseUrl(this.urls.FOLLOWER);
    };
    
    Bnet.prototype.getFollowerDetailUrl = function(follower) {
      return this.parseUrl(this.urls.FOLLOWER_DETAIL, {
        follower: _util.normalize(follower)
      });
    };
    
    Bnet.prototype.getItemUrl = function(item) {
      return this.parseUrl(this.urls.ITEM, {
        item: item.replace('item/', '')
      });
    };
    
    Bnet.prototype.getProfileUrl = function(tag) {
      return this.parseUrl(this.urls.PROFILE, {
        tag: _bnet.tagToUrl(tag)
      });
    };

    Bnet.prototype.getProfileHeroUrl = function(tag, hero) {
      return this.parseUrl(this.urls.PROFILE_HERO, {
        tag: _bnet.tagToUrl(tag),
        hero: _util.normalize(hero)
      });
    };
    
    Bnet.prototype.getItemIconUrl = function(slug, size) {
      return this.parseUrl(this.urls.ITEM_ICON, {
        slug: _util.normalize(slug),
        size: _bnet.isItemIconSize(size) ? _util.normalize(size) : lfgerd3.defaults.itemIconSize,
      });
    };
    
    Bnet.prototype.getSkillIconUrl = function(slug, size) {
      return this.parseUrl(this.urls.SKILL_ICON, {
        slug: _util.normalize(slug),
        size: _bnet.isSkillIconSize(size) ? _util.normalize(size) : lfgerd3.defaults.skillIconSize,
      });
    };
    
    Bnet.prototype.getArtisan = function(cb) {
      this.connector(this.getArtisanUrl(), cb);
    };
    
    Bnet.prototype.getArtisanDetail = function(artisan, cb) {
      this.connector(this.getArtisanDetailUrl(artisan), cb);
    };

    Bnet.prototype.getFollower = function(cb) {
      this.connector(this.getFollowerUrl(), cb);
    };
    
    Bnet.prototype.getFollowerDetail = function(follower, cb) {
      this.connector(this.getFollowerDetailUrl(follower), cb);
    };
    
    Bnet.prototype.getItem = function(item, cb) {
      this.connector(this.getItemUrl(item), cb);
    };
    
    Bnet.prototype.getProfile = function(tag, cb) {
      this.connector(this.getProfileUrl(tag), cb);
    };

    Bnet.prototype.getProfileHero = function(tag, hero, cb) {
      this.connector(this.getProfileHeroUrl(tag, hero), cb);
    };

    return new Bnet();

  })();

  var _getProfileHero = lfgerd3.getProfileHero = function(tag, heroId, cb) {
    function LfgerProfileHero(tag, hero) {
      this.hero = hero;
    };
    
    // helper to get min dmg and do the min/max check
    var getMinHelper = function(value) {
      if(!_util.has(value, 'min') || !_util.has(value, 'max')) {
        _util.log('value did not have both a min and max');
        return 0;
      }
      if(value.min !== value.max) {
        _util.log('value.min !== value.max');
        return 0;
      }

      return value.min;
    };

    LfgerProfileHero.prototype.getTag = function() {
      return tag;
    };
    
    LfgerProfileHero.prototype.getHeroId = function() {
      return heroId;
    };
    
    LfgerProfileHero.prototype.getData = function() {
      return this.hero;
    };

    LfgerProfileHero.prototype.getLfgerData = function() {
      return this.hero.lfger;
    };

    _util.each([
        'head', 'torso', 'feet', 'hands', 'shoulders', 'legs', 'bracers',
        'mainHand', 'offHand', 'waist', 'rightFinger', 'leftFinger', 'neck'], function(item) {
      LfgerProfileHero.prototype['get' + item.charAt(0).toUpperCase() + item.slice(1)] = function() {
        return this.hero.items[item];
      };
    });
    
    LfgerProfileHero.prototype.getItems = function() {
      return this.hero.items;
    };
        
    LfgerProfileHero.prototype.getItem = function(slot) {
      return this.hero.items[slot];
    };
    
    LfgerProfileHero.prototype.getName = function() {
      return this.hero.name;
    };
    
    LfgerProfileHero.prototype.getClass = function() {
      return _bnet.fromSluggable(this.hero.class);
    };
    
    LfgerProfileHero.prototype.getGender = function() {
      return _bnet.getGender(this.hero.gender);
    };

    LfgerProfileHero.prototype.getLevel = function() {
      return this.hero.level;
    };
    
    LfgerProfileHero.prototype.getParagonLevel = function() {
      return this.hero.paragonLevel;
    };
    
    LfgerProfileHero.prototype.isHardcore = function() {
      return this.hero.hardcore;
    };
    
    LfgerProfileHero.prototype.isMelee = function() {
      return 'barbarian' == this.hero.class || 'monk' == this.hero.class;
    };
    
    LfgerProfileHero.prototype.getSkillsData = function() {
      return this.hero.skills;
    };

    LfgerProfileHero.prototype.getItemsData = function() {
      return this.hero.items;
    };

    LfgerProfileHero.prototype.getFollowersData = function() {
      return this.hero.followers;
    };
    
    LfgerProfileHero.prototype.getStatsData = function() {
      return this.hero.stats;
    };
    
    LfgerProfileHero.prototype.getStat = function(stat) {
      stat = _util.normalize(stat);

      return this.hero.stats[stat];
    };
    
    LfgerProfileHero.prototype.getAggregatedModsData = function() {
      return this.hero.lfger.aggregatedMods;
    };
    
    LfgerProfileHero.prototype.getAggregatedMod = function(mod) {
      mod = _util.normalize(mod);

      return this.hero.lfger.aggregatedMods[mod] || 0;
    };
    
    LfgerProfileHero.prototype.getKillsData = function() {
      return this.hero.kills;
    };
    
    LfgerProfileHero.prototype.getProgressData = function() {
      return this.hero.progress;
    };

    LfgerProfileHero.prototype.isDead = function() {
      return this.hero.dead;
    };
    
    LfgerProfileHero.prototype.getLastUpdated = function() {
      return new Date(this.hero['last-updated'] * 1000);
    };
    
    LfgerProfileHero.prototype.getPrimaryAttribute = function() {
      return _db.classesData[_bnet.fromSluggable(this.hero.class)].primaryAttribute;
    };
    
    LfgerProfileHero.prototype.getDpsAttributeBonus = function() {
      primary = this.getPrimaryAttribute();

      return 1 + (this.hero['stats'][primary] * 0.01);
    };
    
    LfgerProfileHero.prototype.getDpsCritBonus = function() {

      // base crit chance of 5 + the crit chance from mod
      //var cc = 5 + (this.getAggregatedMod('crit_percent_bonus_capped') * 100);
      
      // @TODO can't rely on crit percent from mods because of set bonuses..
      var cc = this.hero.stats.critChance * 100;
      
      // base crit dmg of 50 + the crit dmg from mod
      var cd = 50 + (this.getAggregatedMod('crit_damage_percent') * 100);

      return 1 + (cc * 0.01) * (cd * 0.01);

    };
    
    LfgerProfileHero.prototype.getDpsRate = function() {
      var rate = 0;

      // dual wielding?
      if(this.hero.items.mainHand && this.hero.items.mainHand.minDamage
          && this.hero.items.offHand && this.hero.items.offHand.minDamage) {

        var apsPercent = this.getAggregatedMod('Attacks_Per_Second_Percent');
        var apsItemBonus = this.getAggregatedMod('Attacks_Per_Second_Item_Bonus');

        var mhAps = getMinHelper(this.hero.items.mainHand.attacksPerSecond) + apsItemBonus;
        var mhApsMultiplier = (1 + .15 + ((apsPercent * 100) * 0.01));
        var mhRate = mhAps * mhApsMultiplier;

        var ohAps = getMinHelper(this.hero.items.offHand.attacksPerSecond);
        var ohApsMultiplier = (1 + .15 + ((apsPercent * 100) * 0.01));
        var ohRate = ohAps * ohApsMultiplier;

        rate = 2 / ( 1 / mhRate + 1 / ohRate);

      // no dw
      } else {
        var aps = getMinHelper(this.hero.items.mainHand.attacksPerSecond);
        var apsPercent = this.getAggregatedMod('Attacks_Per_Second_Percent');
        var apsMultiplier = (1 + ((apsPercent * 100) * 0.01));

        rate = aps * apsMultiplier;

      }

      return rate;

    };
    
    LfgerProfileHero.prototype.getDpsAverageHit = function() {
      var _this = this;
      var avg = 0;
      var bonusEle = 0;

      _util.each(['Physical', 'Arcane', 'Cold', 'Fire', 'Holy', 'Lightning', 'Poison'], function(damageType) {
        damageType = _util.normalize('Damage_Type_Percent_Bonus#' + damageType);
        if(_this.hero.lfger.aggregatedMods[damageType]) {
          bonusEle += _this.hero.lfger.aggregatedMods[damageType];
        }
      });

      // dual wielding?
      if(this.hero.items.mainHand && this.hero.items.mainHand.minDamage
          && this.hero.items.offHand && this.hero.items.offHand.minDamage) {

        var bonusMin = this.getAggregatedMod('damage_min#physical');
        var bonusMax = bonusMin + this.getAggregatedMod('damage_delta#physical');

        var mhMin = getMinHelper(this.hero.items.mainHand.minDamage) + bonusMin;
        var mhMax = getMinHelper(this.hero.items.mainHand.maxDamage) + bonusMax;
        
        var ohMin = getMinHelper(this.hero.items.offHand.minDamage) + bonusMin;
        var ohMax = getMinHelper(this.hero.items.offHand.maxDamage) + bonusMax;
        
        var mhBaseMin = getMinHelper(this.hero.items.mainHand.minDamage);
        var mhBaseMax = getMinHelper(this.hero.items.mainHand.maxDamage);
        var mhBonusEleDamage = (mhBaseMin + mhBaseMax + bonusMin + bonusMax) / 2 * ((bonusEle * 100) * 0.01);

        var ohBaseMin = getMinHelper(this.hero.items.offHand.minDamage);
        var ohBaseMax = getMinHelper(this.hero.items.offHand.maxDamage);
        var ohBonusEleDamage = (mhBaseMin + mhBaseMax + bonusMin + bonusMax) / 2 * ((bonusEle * 100) * 0.01);

        var mhAvg = (mhMin + mhMax) / 2 + mhBonusEleDamage;
        var ohAvg = (ohMin + ohMax) / 2 + ohBonusEleDamage;
        
        avg = (mhAvg + ohAvg) / 2;

      // no dw
      } else {
        var bonusMin = this.getAggregatedMod('damage_min#physical');
        var bonusMax = bonusMin + this.getAggregatedMod('damage_delta#physical');

        var mhMin = getMinHelper(this.hero.items.mainHand.minDamage) + bonusMin;
        var mhMax = getMinHelper(this.hero.items.mainHand.maxDamage) + bonusMax;

        var mhBaseMin = getMinHelper(this.hero.items.mainHand.minDamage);
        var mhBaseMax = getMinHelper(this.hero.items.mainHand.maxDamage);
        var mhBonusEleDamage = (mhBaseMin + mhBaseMax + bonusMin + bonusMax) / 2 * ((bonusEle * 100) * 0.01);

        var mhAvg = ((mhMin + mhMax) / 2);

        avg = mhAvg + mhBonusEleDamage;

      }

      return avg;

    };
    
    LfgerProfileHero.prototype.getUnbuffedDps = function() {
      return this.getDpsAttributeBonus() * this.getDpsCritBonus() * this.getDpsRate() * this.getDpsAverageHit();
    };
    
    LfgerProfileHero.prototype.getUnbuffedEhp = function() {
      var _stats = this.hero.stats;
      var drArmor = _stats.armor / (_stats.armor + this.hero.level * 50);
      var drResistances = _stats.physicalResist + _stats.fireResist + _stats.coldResist + _stats.lightningResist + _stats.poisonResist + _stats.arcaneResist;
      drResistances = drResistances / 6;
      drResistances = drResistances / (drResistances + this.hero.level * 5);
      
      var ehp = (1 - drArmor)
      ehp *= (1 - drResistances);
      ehp *= this.isMelee() ? .70 : 1;
      ehp = _stats.life / ehp;

      return ehp;

    };

    /*
    @TODO ideas for other types of calculations
    getLfgerBalanceScore - how close your dps/ehp gains are by stat cost
    getLfgerMitigationScore - ehp
    getLfgerSustainScore - ehp with regen, life steal, etc
    getLfgerAdventuringScore - gf mf ms pickup radius
    */
     
    LfgerProfileHero.prototype.load = function(cb) {
      var _this = this;

      _bnet.getProfileHero(tag, heroId, function(err, res) {
        var itemTasks = [];
        _this.hero = res;
        _this.hero.lfger = {};
        _this.hero.lfger.aggregatedMods = {};

        _util.each(res.items, function(item, k) {
          itemTasks.push(function(next) {
            _bnet.getItem(item.tooltipParams, function(err, res) {

              // make sure it has raw attr.
              if(_util.has(res, 'attributesRaw')) {
                
                // iterate the attributes, adding them to our aggregated mods
                _util.each(res.attributesRaw, function(stat, mod) {
                  mod = _util.normalize(mod);

                  if(!_this.hero.lfger.aggregatedMods[mod]) {
                    _this.hero.lfger.aggregatedMods[mod] = 0;
                  }

                  _this.hero.lfger.aggregatedMods[mod] += getMinHelper(stat);
                });
              }

              // check for gems
              if(_util.has(res, 'gems')) {
                
                // iterate the attributes, adding them to our aggregated mods
                _util.each(res.gems, function(gem) {

                  // make sure it has raw attr.
                  if(_util.has(gem, 'attributesRaw')) {
                
                    // iterate the attributes, adding them to our aggregated mods
                    _util.each(gem.attributesRaw, function(stat, mod) {
                      mod = _util.normalize(mod);

                      if(!_this.hero.lfger.aggregatedMods[mod]) {
                        _this.hero.lfger.aggregatedMods[mod] = 0;
                      }

                      _this.hero.lfger.aggregatedMods[mod] += getMinHelper(stat);
                    });
                  }
                });
              }

              // handle set item bonuses
              if(_util.has(res, 'set')) {

                // iterate the attributes, adding them to our aggregated mods
                _util.each(res.set, function(set) {

                  // @TODO this would be awesome
                  if(_util.has(set, 'attributesRaw')) {
                
                    // iterate the attributes, adding them to our aggregated mods
                    _util.each(set.attributesRaw, function(stat, mod) {
                      mod = _util.normalize(mod);

                      if(!_this.hero.lfger.aggregatedMods[mod]) {
                        _this.hero.lfger.aggregatedMods[mod] = 0;
                      }

                      _this.hero.lfger.aggregatedMods[mod] += getMinHelper(stat);
                    });
                  }
                });
              }

              _this.hero.items[k] = res;
              
              next();
            });
          });
        });
    
        lfgerd3.util.queue(itemTasks, function() {
          _this.hero.lfger.unbuffedDps = _this.getUnbuffedDps();
          _this.hero.lfger.unbuffedEhp = _this.getUnbuffedEhp();

          cb(_this);
        }, 5);

      });

      return this;

    };

    var obj = new LfgerProfileHero();

    if(typeof cb === 'function') {
      obj.load(cb);
    };
    
    return obj;

  };

  lfgerd3.getProfile = function(tag, cb) {
    function LfgerProfile() {
      this.profile = null;
    };

    LfgerProfile.prototype.getTag = function() {
      return tag;
    };
    
    LfgerProfile.prototype.getData = function() {
      return this.profile;
    };
    
    LfgerProfile.prototype.getHeroesData = function() {
      return this.profile.heroes;
    };
    
    LfgerProfile.prototype.getFallenHeroesData = function() {
      return this.profile.fallenHeroes;
    };
    
    LfgerProfile.prototype.getArtisansData = function() {
      return this.profile.artisans;
    };
    
    LfgerProfile.prototype.getHardcoreArtisansData = function() {
      return this.profile.hardcoreArtisans;
    };
    
    LfgerProfile.prototype.getArtisanBlacksmithData = function() {
      var ret = null;

      _util.map(this.profile.artisans, function(value, key) {
        if(value && value.slug && 'blacksmith' === value.slug) {
          ret = value;
        }
      });

      return ret;
    };
    
    LfgerProfile.prototype.getArtisanJewelerData = function() {
      var ret = null;

      _util.map(this.profile.artisans, function(value, key) {
        if(value && value.slug && 'jeweler' === value.slug) {
          ret = value;
        }
      });

      return ret;
    };
    
    LfgerProfile.prototype.getHardcoreArtisanBlacksmithData = function() {
      var ret = null;

      _util.map(this.profile.hardcoreArtisans, function(value, key) {
        if(value && value.slug && 'blacksmith' === value.slug) {
          ret = value;
        }
      });

      return ret;
    };
    
    LfgerProfile.prototype.getHardcoreArtisanJewelerData = function() {
      var ret = null;

      _util.map(this.profile.hardcoreArtisans, function(value, key) {
        if(value && value.slug && 'jeweler' === value.slug) {
          ret = value;
        }
      });

      return ret;
    };
    
    LfgerProfile.prototype.getKillsData = function() {
      return this.profile.kills;
    };
    
    LfgerProfile.prototype.getTimePlayedData = function() {
      return this.profile.timePlayed;
    };
    
    LfgerProfile.prototype.getProgressionData = function() {
      return this.profile.progression;
    };
    
    LfgerProfile.prototype.getHardcoreProgressionData = function() {
      return this.profile.hardcoreProgression;
    };
    
    LfgerProfile.prototype.getLastHeroPlayed = function() {
      return this.profile.lastHeroPlayed;
    };
    
    LfgerProfile.prototype.getLastHeroPlayedData = function() {
      var ret = {};

      _.each(this.profile.heroes, function(hero) {
        if(this.profile.lastHeroPlayed == hero.id) {
          ret = hero;
        }
      });

      return ret;
    };
    
    LfgerProfile.prototype.getLastHeroPlayedName = function() {
      var data = this.getLastHeroPlayedData();

      return data && data.name ? data.name : "";
    };
    
    LfgerProfile.prototype.getLastHeroPlayedClass = function() {
      var data = this.getLastHeroPlayedData();

      return data && data.class ? _bnet.fromSluggable(data.class) : "";
    };

    LfgerProfile.prototype.getLastUpdated = function() {
      return new Date(this.profile.lastUpdated * 1000);
    };
        
    LfgerProfile.prototype.getEliteKills = function() {
      return this.profile.kills.elites;
    };
    
    LfgerProfile.prototype.getMonsterKills = function() {
      return this.profile.kills.monsters;
    };

    LfgerProfile.prototype.getHardcoreMonsterKills = function() {
      return this.profile.kills.hardcoreMonsters;
    };
    
    LfgerProfile.prototype.getMainClass = function() {
      var ret = _db.classes.BARBARIAN;

      _util.map(this.profile.timePlayed, function(value, key) {
        if(1 === value) {
          ret = _bnet.fromSluggable(key);
        }
      });

      return ret;
    };
    
    LfgerProfile.prototype.getTimePlayedByClass = function(which) {
      which = _bnet.toSluggable(which);

      if(!which || !this.profile.timePlayed[which]) {
        return 0;
      }
      
      return this.profile.timePlayed[which];
    };

    LfgerProfile.prototype.getHighestLevel = function() {
      var ret = 0;

      _util.map(this.profile.heroes, function(value, key) {
        if(value && value.level && value.level > ret) {
          ret = value.level;
        }
      });

      return ret;
    };
    
    LfgerProfile.prototype.getHighestParagonLevel = function() {
      var ret = 0;

      _util.map(this.profile.heroes, function(value, key) {
        if(value && value.paragonLevel && value.paragonLevel > ret) {
          ret = value.paragonLevel;
        }
      });

      return ret;
    };
    
    LfgerProfile.prototype.getTotalParagonLevel = function() {
      var ret = 0;

      _util.map(this.profile.heroes, function(value, key) {
        if(value && value.paragonLevel && value.paragonLevel) {
          ret += value.paragonLevel;
        }
      });

      return ret;
    };
    
    LfgerProfile.prototype.getBlacksmithLevel = function() {
      var ret = 0;

      _util.map(this.profile.artisans, function(value, key) {
        if(value && value.slug && value.level && 'blacksmith' === value.slug) {
          ret = value.level;
        }
      });

      return ret;
    };
    
    LfgerProfile.prototype.getJewelerLevel = function() {
      var ret = 0;

      _util.map(this.profile.artisans, function(value, key) {
        if(value && value.slug && value.level && 'jeweler' === value.slug) {
          ret = value.level;
        }
      });

      return ret;
    };
    
    LfgerProfile.prototype.getHardcoreBlacksmithLevel = function() {
      var ret = 0;

      _util.map(this.profile.hardcoreArtisans, function(value, key) {
        if(value && value.slug && value.level && 'blacksmith' === value.slug) {
          ret = value.level;
        }
      });

      return ret;
    };
    
    LfgerProfile.prototype.getHardcoreJewelerLevel = function() {
      var ret = 0;

      _util.map(this.profile.hardcoreArtisans, function(value, key) {
        if(value && value.slug && value.level && 'jeweler' === value.slug) {
          ret = value.level;
        }
      });

      return ret;
    };
    
    LfgerProfile.prototype.load = function(cb) {
      var _this = this;
      _bnet.getProfile(tag, function(err, res) {
        if(err) {
          throw err;
        }

        _this.profile = res;

        cb(_this);
      });

      return this;
    };

    var obj = new LfgerProfile();

    if(typeof cb === 'function') {
      obj.load(cb);
    };
    
    return obj;

  };

  var _init = lfgerd3.init = (function() {
    function Init() {};

    Init.prototype.node = function() {
      var request = require('request');

      _bnet.connector = function(url, cb) {
        request(url, function (error, response, body) {
          if(!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            if(obj.code) {
              cb("Got a error code: " + obj.code.toString(), false);

            } else {
              cb(null, JSON.parse(body));
            }
          } else {
            if(error) {
              cb(error.toString(), false);
            } else {
              cb("Got a error status code of: " +  response.statusCode.toString(), false);
            }
          }
        });
      };
    };
    
    Init.prototype.dom = function() {
      _bnet.connector = function(url, cb) {
        // @TODO implement jsonp
      };
    };

    return new Init();

  })();
  
  lfgerd3.defaults = {
    region: _db.regions.US,
    locale: _db.locales.EN,
    gender: _db.genders.FEMALE,
    class: _db.classes.BARBARIAN,
    hostname: _bnet.hostnames.US,
    itemIconSize: _bnet.itemIconSizes.LARGE,
    skillIconSize: _bnet.skillIconSizes.LARGE
  };

  // Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = lfgerd3;
    _init.node();

  // dom
  } else {
    if (typeof this.LFGER === 'undefined') {
      this.LFGER = {};
    }

    this.LFGER.d3 = lfgerd3;
    _init.dom();

  }
})();