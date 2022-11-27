const User = require(process.mainModule.path + '/src/models/user/User.js');
const { Attachment } = require('discord.js');
const fetch = require('node-fetch');
const { createCanvas, loadImage } = require('canvas');

const imageUrlRegex = /\?size=2048$/g;

exports.run = (bot, msg, args, mongoose) => {
    let user = msg.mentions.users.first() ? msg.mentions.users.first() : msg.author;

    let sql = User.find({userId: user.id})
    sql.exec(async (err, values) => {
        if (err) return;
        if(values && values.length === 0) return;

        try {
            const buffer = await profile(msg, user, values[0]);
            const filename = `profile-${msg.author.id}.jpg`;
            const attachment = new Attachment(buffer, filename);
            await msg.channel.send(attachment);
            
        } catch (error) {
            console.log(error);
        }
    });
}

async function profile(message, user, userDb) {
    try {
      const result = await fetch(user.displayAvatarURL.replace(imageUrlRegex, '?size=128'));
      if (!result.ok) throw new Error('Failed to get the avatar!');
      const avatar = await result.buffer();
      const name = user.username > 17 ? user.username.substring(0, 17) + '...' : user.username;

      const image = await loadImage(avatar);

      const canvas = createCanvas(800, 600);
      const ctx = canvas.getContext('2d');

      // CARD
      ctx.strokeStyle = "#262c38";
      ctx.lineWidth = 0;

      let bg;
      if(userDb.backgroundImg) {
        bg = await loadImage(`./assets/imgs/backgrounds/${userDb.backgroundImg}.jpg`);
      } else {
        bg = await loadImage(`./assets/imgs/backgrounds/2.jpg`);
      }


      //BACKGROUND
      drawPolygon(ctx, 40, 40, 750, 550, 10, bg, null, true, 0.95);
      ctx.stroke();

      //USERNAME
      ctx.lineWidth = 1;
      drawPolygon(ctx, 180, 55, 610, 75, 10, null, '#000', true, 0.3);
      ctx.stroke();

      ctx.font = "50px Impact";
      ctx.fillStyle = "#fff";
      ctx.fillText(`${name}`, 220, 111);

      //INFOS
      drawPolygon(ctx, 50, 400, 313, 180, 10, null, '#000', true, 0.2);
      ctx.stroke();

      ctx.font = "30px Impact";
      ctx.fillStyle = "#fff";
      ctx.fillText(`credits: $${userDb.credits}`, 67, 440);

      //GACHAS
      ctx.lineWidth = 1;
      drawPolygon(ctx, 375, 400, 90, 180, 10, null, '#fff', true, 0.3);
      ctx.stroke();

      ctx.font = "80px Impact";
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "#000";
      ctx.fillText("?", 400, 520);
      ctx.globalAlpha = 1;

      ctx.lineWidth = 1;
      drawPolygon(ctx, 480, 400, 90, 180, 10, null, '#fff', true, 0.3);
      ctx.stroke();

      ctx.font = "80px Impact";
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "#000";
      ctx.fillText("?", 505, 520);
      ctx.globalAlpha = 1;

      ctx.lineWidth = 1;
      drawPolygon(ctx, 585, 400, 90, 180, 10, null, '#fff', true, 0.3);
      ctx.stroke();

      ctx.font = "80px Impact";
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "#000";
      ctx.fillText("?", 610, 520);
      ctx.globalAlpha = 1;

      ctx.lineWidth = 1;
      drawPolygon(ctx, 690, 400, 90, 180, 10, null, '#fff', true, 0.3);
      ctx.stroke();

      ctx.font = "80px Impact";
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "#000";
      ctx.fillText("?", 715, 520);
      ctx.globalAlpha = 1;

      //GUILD LEVEL
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(735, 200, 47, 0, Math.PI*2);
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 5;
      ctx.shadowOffsetX = 5;
      ctx.shadowColor = "#000";
      ctx.fillStyle = "#fff";
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(735, 200, 45, 0, Math.PI*2);
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.closePath();
      ctx.globalAlpha = 1;


      ctx.font = "50px Impact";
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.fillText("?", 737, 236);

      ctx.font = "20px Impact";
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.fillText("G. LEVEL", 736, 184);

      //LEVEL
      ctx.beginPath();
      ctx.arc(735, 90, 45, 0, Math.PI*2);
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 5;
      ctx.shadowOffsetX = 5;
      ctx.shadowColor = "#000";
      ctx.fillStyle = "#fff";
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(735, 90, 45, 0, Math.PI*2);
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.closePath();
      ctx.globalAlpha = 1;

      ctx.font = "50px Impact";
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.fillText(`${userDb.level}`, 736, 122);

      ctx.font = "20px Impact";
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.fillText("LEVEL", 736, 73);

      //AVATAR
      ctx.beginPath();
      ctx.arc(105, 105, 105, 0, Math.PI*2);
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 5;
      ctx.shadowOffsetX = 5;
      ctx.shadowColor = "#000";
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(105, 105, 90, 0, Math.PI*2);
      ctx.clip();
      ctx.stroke();
      ctx.drawImage(image,5,10,200,200);
      ctx.closePath();

      return canvas.toBuffer();

    } catch (error) {
      await message.channel.send(`An error occurred: **${error.message}**`);
    }
  }

module.exports.config = {
    name: "profile",
    aliases: ["profile", "p"]
}


let drawPolygon = function(ctx, x, y, width, height, radius, bg, fillColor, isFilled, alpha) {
  ctx.globalAlpha = alpha || 0.85;
  let pts = [[x, y],
        [x+width,  y],
        [x+width, y+height],
        [x, y+height]];

  if (radius > 0) {
    pts = getRoundedPoints(pts, radius);
  }
  let i, pt, len = pts.length;
  for (i = 0; i < len; i++) {
    pt = pts[i];
    if (i == 0) {
      ctx.beginPath();
      ctx.moveTo(pt[0], pt[1]);
    } else {
      ctx.lineTo(pt[0], pt[1]);
    }
    if (radius > 0) {
      ctx.quadraticCurveTo(pt[2], pt[3], pt[4], pt[5]);
    }
  }
  if(bg) {
    let pattern = ctx.createPattern(bg, "repeat");
    ctx.fillStyle = pattern;
  } else if (fillColor) {
    ctx.fillStyle = fillColor;
  }

  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 3;
  ctx.shadowOffsetX = 3;
  ctx.shadowColor = "#000";
  if(isFilled) {
    ctx.fill();
  }
  ctx.closePath();
  ctx.globalAlpha = 1;
};

let getRoundedPoints = function(pts, radius) {
  let i1, i2, i3, p1, p2, p3, prevPt, nextPt,
      len = pts.length,
      res = new Array(len);
  for (i2 = 0; i2 < len; i2++) {
    i1 = i2-1;
    i3 = i2+1;
    if (i1 < 0) {
      i1 = len - 1;
    }
    if (i3 == len) {
      i3 = 0;
    }
    p1 = pts[i1];
    p2 = pts[i2];
    p3 = pts[i3];
    prevPt = getRoundedPoint(p1[0], p1[1], p2[0], p2[1], radius, false);
    nextPt = getRoundedPoint(p2[0], p2[1], p3[0], p3[1], radius, true);
    res[i2] = [prevPt[0], prevPt[1], p2[0], p2[1], nextPt[0], nextPt[1]];
  }
  return res;
};

let getRoundedPoint = function(x1, y1, x2, y2, radius, first) {
  let total = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
      idx = first ? radius / total : (total - radius) / total;
  return [x1 + (idx * (x2 - x1)), y1 + (idx * (y2 - y1))];
};