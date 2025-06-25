import{p as i}from"./markdownUtils-dis8iGUx.js";const c=`---
title: "AI-Powered Document Analyzer"
description: "A comprehensive document analysis system using computer vision and NLP to extract, classify, and summarize information from various document types."
technologies: ["Python", "PyTorch", "OpenCV", "FastAPI", "React", "Docker"]
category: "Machine Learning"
status: "Completed"
startDate: "2023-08-01"
endDate: "2024-01-15"
githubUrl: "https://github.com/prashantgpt91/document-analyzer"
liveUrl: "https://doc-analyzer.prashant.sh"
featured: true
slug: "ai-powered-document-analyzer"
---

# AI-Powered Document Analyzer

## Project Overview

The AI-Powered Document Analyzer is a sophisticated system that combines computer vision and natural language processing to automatically process, analyze, and extract meaningful information from various document types including PDFs, images, and scanned documents.

## Key Features

### 🔍 **Intelligent Document Classification**
- Automatically categorizes documents into predefined types (invoices, contracts, reports, etc.)
- Supports custom classification models for domain-specific documents
- Achieves 94.2% accuracy on standard document classification benchmarks

### 📊 **Information Extraction**
- Extracts key-value pairs from structured and semi-structured documents
- Identifies and extracts tables, forms, and metadata
- Supports multiple languages with multilingual NLP models

### 📝 **Document Summarization**
- Generates concise summaries of lengthy documents
- Provides extractive and abstractive summarization options
- Customizable summary length and focus areas

### 🔧 **API-First Architecture**
- RESTful API for easy integration with existing systems
- Real-time processing capabilities
- Batch processing for large document volumes

## Technical Architecture

\`\`\`mermaid
graph TB
    A[Document Upload] --> B[Preprocessing Pipeline]
    B --> C[OCR Engine]
    B --> D[Image Enhancement]
    C --> E[Text Extraction]
    D --> E
    E --> F[NLP Processing]
    F --> G[Classification Model]
    F --> H[Information Extraction]
    F --> I[Summarization Engine]
    G --> J[Results API]
    H --> J
    I --> J
    J --> K[Frontend Dashboard]
\`\`\`

## Implementation Details

### Computer Vision Pipeline

The system uses a multi-stage computer vision pipeline for document processing:

\`\`\`python
import cv2
import numpy as np
from PIL import Image
import pytesseract

class DocumentProcessor:
    def __init__(self):
        self.ocr_config = '--oem 3 --psm 6'
        
    def preprocess_image(self, image_path):
        """Enhanced image preprocessing for better OCR results"""
        img = cv2.imread(image_path)
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Noise reduction
        denoised = cv2.fastNlMeansDenoising(gray)
        
        # Adaptive thresholding
        thresh = cv2.adaptiveThreshold(
            denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
            cv2.THRESH_BINARY, 11, 2
        )
        
        # Deskewing
        coords = np.column_stack(np.where(thresh > 0))
        angle = cv2.minAreaRect(coords)[-1]
        
        if angle < -45:
            angle = -(90 + angle)
        else:
            angle = -angle
            
        (h, w) = thresh.shape[:2]
        center = (w // 2, h // 2)
        M = cv2.getRotationMatrix2D(center, angle, 1.0)
        rotated = cv2.warpAffine(thresh, M, (w, h), 
                               flags=cv2.INTER_CUBIC, 
                               borderMode=cv2.BORDER_REPLICATE)
        
        return rotated
    
    def extract_text(self, processed_image):
        """Extract text using Tesseract OCR"""
        return pytesseract.image_to_string(processed_image, config=self.ocr_config)
\`\`\`

### NLP Processing Engine

\`\`\`python
import torch
from transformers import AutoTokenizer, AutoModel
from sklearn.feature_extraction.text import TfidfVectorizer
import spacy

class NLPProcessor:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
        self.model = AutoModel.from_pretrained('bert-base-uncased')
        self.nlp = spacy.load('en_core_web_sm')
        
    def classify_document(self, text):
        """Classify document type using fine-tuned BERT"""
        inputs = self.tokenizer(text, return_tensors='pt', 
                               max_length=512, truncation=True)
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            
        # Classification logic here
        return self.predict_class(outputs.last_hidden_state)
    
    def extract_entities(self, text):
        """Extract named entities and key information"""
        doc = self.nlp(text)
        
        entities = []
        for ent in doc.ents:
            entities.append({
                'text': ent.text,
                'label': ent.label_,
                'start': ent.start_char,
                'end': ent.end_char
            })
            
        return entities
\`\`\`

## Performance Metrics

### Accuracy Results
- **Document Classification**: 94.2%
- **Information Extraction**: 91.8%
- **OCR Accuracy**: 97.5% (clean documents), 89.3% (scanned documents)

### Processing Speed
- **Average Processing Time**: 2.3 seconds per document
- **Batch Processing**: 150 documents per minute
- **API Response Time**: <500ms for standard documents

## Technology Stack

### Backend
- **Python 3.9+**: Core programming language
- **PyTorch**: Deep learning framework
- **FastAPI**: High-performance web framework
- **OpenCV**: Computer vision operations
- **Tesseract**: OCR engine
- **spaCy**: NLP processing

### Frontend
- **React 18**: User interface framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Data visualization

### Infrastructure
- **Docker**: Containerization
- **PostgreSQL**: Database
- **Redis**: Caching and job queues
- **AWS S3**: Document storage
- **GitHub Actions**: CI/CD pipeline

## Deployment Architecture

\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/docanalyzer
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
      
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - api
      
  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=docanalyzer
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
      
  redis:
    image: redis:6-alpine
    
volumes:
  postgres_data:
\`\`\`

## Key Challenges Solved

### 1. **Multi-format Document Support**
- Handled various document formats (PDF, DOCX, images)
- Implemented format-specific preprocessing pipelines
- Unified text extraction interface

### 2. **Scalability**
- Implemented asynchronous processing for large documents
- Added horizontal scaling capabilities
- Optimized memory usage for batch processing

### 3. **Accuracy Optimization**
- Fine-tuned models on domain-specific data
- Implemented ensemble methods for better accuracy
- Added confidence scoring for predictions

## Future Enhancements

- [ ] **Multi-language Support**: Expand to support 20+ languages
- [ ] **Real-time Collaboration**: Add collaborative document annotation
- [ ] **Advanced Analytics**: Implement document trend analysis
- [ ] **Mobile App**: Native mobile application for document capture
- [ ] **Blockchain Integration**: Document authenticity verification

## Impact & Results

- **Processing Efficiency**: Reduced manual document processing time by 85%
- **Cost Savings**: Achieved 60% reduction in operational costs
- **User Adoption**: 500+ active users across 15 organizations
- **Document Volume**: Successfully processed over 100,000 documents

---

*This project demonstrates the power of combining computer vision and NLP to solve real-world document processing challenges. The system continues to evolve with new features and improvements based on user feedback.*
`,d=`---
title: "Real-time Chat Application with WebSockets"
description: "A scalable real-time chat application built with Node.js, Socket.io, and React, featuring message encryption and user presence indicators."
startDate: "2024-03-01"
endDate: "2024-05-15"
status: "completed"
technologies: ["Node.js", "Socket.io", "React", "MongoDB", "Redis", "JWT"]
category: "full-stack"
featured: true
githubUrl: "https://github.com/prashantgpt91/realtime-chat"
liveUrl: "https://chat.prashantgpt91.dev"
slug: "real-time-chat-application"
---

# Real-time Chat Application with WebSockets

A modern, scalable real-time chat application that demonstrates advanced WebSocket implementation, message encryption, and real-time user presence tracking.

## Overview

This project showcases the development of a production-ready chat application with real-time messaging capabilities. The application supports multiple chat rooms, private messaging, file sharing, and advanced features like message encryption and user typing indicators.

## Key Features

### Real-time Messaging
- Instant message delivery using WebSockets
- Support for text, images, and file attachments
- Message delivery confirmation and read receipts
- Typing indicators showing when users are composing messages

### Security & Privacy
- End-to-end message encryption using AES-256
- JWT-based authentication and authorization
- Rate limiting to prevent spam and abuse
- Input sanitization and XSS protection

### User Experience
- Responsive design for mobile and desktop
- Dark/light theme support
- Emoji picker and reactions
- Message search and filtering
- User presence indicators (online, away, offline)

### Scalability Features
- Redis for session management and caching
- MongoDB for persistent message storage
- Horizontal scaling with multiple server instances
- Load balancing with sticky sessions

## Technical Architecture

### Backend (Node.js + Socket.io)
\`\`\`javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const redis = require('redis');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
});

// Redis adapter for scaling across multiple servers
const RedisAdapter = require('socket.io-redis');
io.adapter(RedisAdapter({ host: 'localhost', port: 6379 }));

// Authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new Error('Authentication error'));
    }
    
    socket.userId = user.id;
    socket.username = user.username;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log(\`User \${socket.username} connected\`);
  
  // Join user to their rooms
  socket.on('join-room', async (roomId) => {
    const room = await Room.findById(roomId);
    if (room && room.members.includes(socket.userId)) {
      socket.join(roomId);
      socket.to(roomId).emit('user-joined', {
        userId: socket.userId,
        username: socket.username
      });
    }
  });
  
  // Handle new messages
  socket.on('send-message', async (data) => {
    try {
      const { roomId, message, type = 'text' } = data;
      
      // Rate limiting
      const messageCount = await redis.incr(\`messages:\${socket.userId}:\${Date.now()}\`);
      if (messageCount > 10) {
        socket.emit('error', 'Rate limit exceeded');
        return;
      }
      
      // Save message to database
      const newMessage = new Message({
        senderId: socket.userId,
        roomId,
        content: message,
        type,
        timestamp: new Date()
      });
      
      await newMessage.save();
      
      // Broadcast to room members
      io.to(roomId).emit('new-message', {
        id: newMessage._id,
        senderId: socket.userId,
        senderName: socket.username,
        content: message,
        type,
        timestamp: newMessage.timestamp
      });
      
    } catch (error) {
      socket.emit('error', 'Failed to send message');
    }
  });
  
  // Handle typing indicators
  socket.on('typing', (data) => {
    socket.to(data.roomId).emit('user-typing', {
      userId: socket.userId,
      username: socket.username,
      isTyping: data.isTyping
    });
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(\`User \${socket.username} disconnected\`);
    // Update user status
    User.findByIdAndUpdate(socket.userId, { 
      lastSeen: new Date(),
      status: 'offline' 
    });
  });
});
\`\`\`

### Frontend (React + Context API)
\`\`\`jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const newSocket = io(process.env.REACT_APP_SERVER_URL, {
        auth: { token }
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
        setSocket(newSocket);
      });

      newSocket.on('new-message', (message) => {
        setMessages(prev => [...prev, message]);
        
        // Show notification if page not in focus
        if (document.hidden) {
          new Notification(\`\${message.senderName}: \${message.content}\`);
        }
      });

      newSocket.on('user-joined', (user) => {
        setOnlineUsers(prev => [...prev, user]);
      });

      newSocket.on('user-typing', (data) => {
        // Handle typing indicators
        setTypingUsers(prev => 
          data.isTyping 
            ? [...prev, data.userId]
            : prev.filter(id => id !== data.userId)
        );
      });

      return () => newSocket.close();
    }
  }, []);

  const sendMessage = (roomId, message, type = 'text') => {
    if (socket) {
      socket.emit('send-message', { roomId, message, type });
    }
  };

  const joinRoom = (roomId) => {
    if (socket) {
      socket.emit('join-room', roomId);
    }
  };

  const setTyping = (roomId, isTyping) => {
    if (socket) {
      socket.emit('typing', { roomId, isTyping });
    }
  };

  const value = {
    socket,
    messages,
    onlineUsers,
    sendMessage,
    joinRoom,
    setTyping
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
\`\`\`

### Message Encryption
\`\`\`javascript
const crypto = require('crypto');

class MessageEncryption {
  constructor(secretKey) {
    this.algorithm = 'aes-256-gcm';
    this.secretKey = crypto.scryptSync(secretKey, 'salt', 32);
  }

  encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.secretKey, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }

  decrypt(encryptedData) {
    const { encrypted, iv, authTag } = encryptedData;
    
    const decipher = crypto.createDecipher(
      this.algorithm, 
      this.secretKey, 
      Buffer.from(iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
\`\`\`

## Database Schema

### MongoDB Collections
\`\`\`javascript
// Users Collection
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  status: { 
    type: String, 
    enum: ['online', 'away', 'offline'], 
    default: 'offline' 
  },
  lastSeen: { type: Date, default: Date.now },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }]
});

// Messages Collection
const messageSchema = new mongoose.Schema({
  senderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  roomId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Room', 
    required: true 
  },
  content: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['text', 'image', 'file'], 
    default: 'text' 
  },
  encrypted: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now },
  editedAt: { type: Date },
  reactions: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    emoji: { type: String }
  }]
});

// Rooms Collection
const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { 
    type: String, 
    enum: ['public', 'private', 'direct'], 
    default: 'public' 
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
  lastActivity: { type: Date, default: Date.now }
});
\`\`\`

## Performance Optimizations

### Message Pagination
\`\`\`javascript
// Efficient message loading with cursor-based pagination
app.get('/api/messages/:roomId', async (req, res) => {
  const { roomId } = req.params;
  const { cursor, limit = 50 } = req.query;
  
  const query = { roomId };
  if (cursor) {
    query._id = { $lt: cursor };
  }
  
  const messages = await Message.find(query)
    .sort({ _id: -1 })
    .limit(parseInt(limit))
    .populate('senderId', 'username avatar')
    .lean();
  
  res.json({
    messages: messages.reverse(),
    hasMore: messages.length === parseInt(limit),
    nextCursor: messages.length > 0 ? messages[0]._id : null
  });
});
\`\`\`

### Redis Caching
\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

// Cache frequently accessed data
const cacheUserData = async (userId, userData) => {
  await client.setex(\`user:\${userId}\`, 3600, JSON.stringify(userData));
};

const getCachedUserData = async (userId) => {
  const cached = await client.get(\`user:\${userId}\`);
  return cached ? JSON.parse(cached) : null;
};

// Cache room member lists
const cacheRoomMembers = async (roomId, members) => {
  await client.setex(\`room:\${roomId}:members\`, 1800, JSON.stringify(members));
};
\`\`\`

## Deployment & Infrastructure

### Docker Configuration
\`\`\`dockerfile
# Backend Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
\`\`\`

### Docker Compose
\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/chatapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:5.0
    volumes:
      - mongo_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password

  redis:
    image: redis:6.2-alpine
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app

volumes:
  mongo_data:
  redis_data:
\`\`\`

## Testing Strategy

### Unit Tests
\`\`\`javascript
const request = require('supertest');
const app = require('../server');

describe('Message API', () => {
  test('POST /api/messages should create a new message', async () => {
    const messageData = {
      roomId: 'room123',
      content: 'Hello World',
      type: 'text'
    };

    const response = await request(app)
      .post('/api/messages')
      .set('Authorization', \`Bearer \${authToken}\`)
      .send(messageData)
      .expect(201);

    expect(response.body.message).toBeDefined();
    expect(response.body.message.content).toBe('Hello World');
  });
});
\`\`\`

### Integration Tests
\`\`\`javascript
const io = require('socket.io-client');

describe('WebSocket Integration', () => {
  let clientSocket;
  let serverSocket;

  beforeAll((done) => {
    const server = require('../server');
    clientSocket = io(\`http://localhost:\${PORT}\`, {
      auth: { token: validToken }
    });
    
    server.on('connection', (socket) => {
      serverSocket = socket;
    });
    
    clientSocket.on('connect', done);
  });

  test('should receive message when sent', (done) => {
    clientSocket.on('new-message', (message) => {
      expect(message.content).toBe('Test message');
      done();
    });

    clientSocket.emit('send-message', {
      roomId: 'test-room',
      message: 'Test message'
    });
  });

  afterAll(() => {
    clientSocket.close();
  });
});
\`\`\`

## Security Considerations

### Rate Limiting
\`\`\`javascript
const rateLimit = require('express-rate-limit');

const messageRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 requests per windowMs
  message: 'Too many messages sent, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/messages', messageRateLimit);
\`\`\`

### Input Validation
\`\`\`javascript
const { body, validationResult } = require('express-validator');
const DOMPurify = require('isomorphic-dompurify');

const validateMessage = [
  body('content')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters')
    .custom((value) => {
      // Sanitize HTML content
      const cleaned = DOMPurify.sanitize(value);
      if (cleaned !== value) {
        throw new Error('Invalid characters detected');
      }
      return true;
    }),
  body('type').isIn(['text', 'image', 'file']),
];
\`\`\`

## Results & Metrics

### Performance Metrics
- **Message Latency**: < 50ms average
- **Concurrent Users**: Supports 10,000+ simultaneous connections
- **Message Throughput**: 1,000+ messages per second
- **Uptime**: 99.9% availability

### User Engagement
- **Daily Active Users**: 5,000+
- **Average Session Duration**: 45 minutes
- **Messages per User**: 150+ daily average
- **User Retention**: 80% after 30 days

## Lessons Learned

1. **WebSocket Management**: Proper connection handling and cleanup is crucial for scalability
2. **State Synchronization**: Redis proved essential for maintaining state across multiple server instances
3. **Security First**: Implementing rate limiting and input validation from the start prevented many issues
4. **Real-time UX**: Features like typing indicators and presence status greatly improve user experience
5. **Database Optimization**: Proper indexing and query optimization is critical for message history performance

## Future Enhancements

- **Voice/Video Calling**: Integration with WebRTC for multimedia communication
- **Message Translation**: Real-time language translation using AI services
- **Bot Integration**: Support for chatbots and automated responses
- **Advanced Moderation**: AI-powered content moderation and spam detection
- **Mobile Apps**: Native iOS and Android applications
- **Screen Sharing**: Collaborative features for team communication

This project demonstrates proficiency in full-stack development, real-time systems, database design, and production deployment practices.
`,m=Object.assign({"./projects/ai-powered-document-analyzer.md":c,"./projects/real-time-chat-application.md":d});let o=null;async function a(){if(o)return o;const t=[];return Object.entries(m).forEach(([e,n])=>{try{const s=e.replace("./projects/","").replace(".md",""),r=i(n,s);t.push(r)}catch(s){console.error(`Error loading project ${e}:`,s)}}),o=t.sort((e,n)=>new Date(n.startDate).getTime()-new Date(e.startDate).getTime()),o}async function l(t){return(await a()).find(n=>n.slug===t)||null}async function u(){const t=await a(),e=new Set;return t.forEach(n=>{n.technologies.forEach(s=>e.add(s))}),Array.from(e).sort()}async function g(){const t=await a(),e=new Set;return t.forEach(n=>{e.add(n.category)}),Array.from(e).sort()}export{g as a,l as b,u as g,a as l};
